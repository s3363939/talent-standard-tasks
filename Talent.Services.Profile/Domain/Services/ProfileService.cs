﻿using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        public async Task<bool> AddNewLanguageAsync(AddLanguageViewModel language)
        {
            try
            {
                if (language != null)
                {
                    var newLanguage = new UserLanguage
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        IsDeleted = false
                    };

                    UpdateLanguageFromView(language, newLanguage);


                    await _userLanguageRepository.Add(newLanguage);

                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            User profile = await _userRepository.GetByIdAsync(Id);
            if (profile != null)
            {
                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                var languages = profile.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
                var experiences = profile.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                var result = new TalentProfileViewModel
                {
                    Id = profile.Id,
                    Address = profile.Address,
                    Languages = languages,
                    LinkedAccounts = profile.LinkedAccounts,
                    FirstName = profile.FirstName,
                    LastName = profile.LastName,
                    MiddleName = profile.MiddleName,
                    Gender = profile.Gender,
                    Email = profile.Email,
                    Phone = profile.Phone,
                    MobilePhone = profile.MobilePhone,
                    VisaStatus = profile.VisaStatus,
                    VisaExpiryDate = profile.VisaExpiryDate,
                    Nationality = profile.Nationality,
                    JobSeekingStatus = profile.JobSeekingStatus,
                    CvName = profile.CvName,
                    IsMobilePhoneVerified = profile.IsMobilePhoneVerified,
                    Skills = skills,
                    Summary = profile.Summary,
                    Description = profile.Description,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    Experience = experiences
                };
                return result;
            }
            return null;
        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            try
            {
                if (model.Id != null)
                {
                    User existingUser = await _userRepository.GetByIdAsync(model.Id);

                    existingUser.Email = model.Email;
                    existingUser.FirstName = model.FirstName;
                    existingUser.LastName = model.LastName;
                    existingUser.LinkedAccounts = model.LinkedAccounts;
                    existingUser.Phone = model.Phone;
                    existingUser.Description = model.Description;
                    existingUser.Summary = model.Summary;
                    existingUser.Address = model.Address;
                    existingUser.Nationality = model.Nationality;
                    existingUser.VisaStatus = model.VisaStatus;
                    existingUser.VisaExpiryDate = model.VisaExpiryDate;
                    existingUser.JobSeekingStatus = model.JobSeekingStatus;
                    existingUser.ProfilePhoto = model.ProfilePhoto;
                    existingUser.ProfilePhotoUrl = model.ProfilePhotoUrl;

                    var newLanguages = new List<UserLanguage>();
                    foreach (var item in model.Languages)
                    {
                        var language = existingUser.Languages.SingleOrDefault(x => x.Id == item.Id);
                        if (language == null)
                        {
                            language = new UserLanguage
                            {
                                Id = ObjectId.GenerateNewId().ToString(),
                                IsDeleted = false
                            };
                        }
                        UpdateLanguageFromView(item, language);
                        newLanguages.Add(language);
                    }

                    existingUser.Languages = newLanguages;

                    var newSkills = new List<UserSkill>();
                    foreach (var item in model.Skills)
                    {
                        var skill = existingUser.Skills.SingleOrDefault(x => x.Id == item.Id);
                        if (skill == null)
                        {
                            skill = new UserSkill
                            {
                                Id = ObjectId.GenerateNewId().ToString(),
                                IsDeleted = false
                            };
                        }
                        UpdateSkillFromView(item, skill);
                        newSkills.Add(skill);
                    }

                    existingUser.Skills = newSkills;

                    var newExperiences = new List<UserExperience>();
                    foreach (var item in model.Experience)
                    {
                        var experience = existingUser.Experience.SingleOrDefault(x => x.Id == item.Id);
                        if (experience == null)
                        {
                            experience = new UserExperience
                            {
                                Id = ObjectId.GenerateNewId().ToString()
                            };
                        }
                        UpdateExperienceFromView(item, experience);
                        newExperiences.Add(experience);
                    }

                    existingUser.Experience = newExperiences;

                    existingUser.UpdatedBy = updaterId;
                    existingUser.UpdatedOn = DateTime.Now;

                    await _userRepository.Update(existingUser);

                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            try
            {
                User updatedUser = await _userRepository.GetByIdAsync(talentId);

                if (updatedUser == null)
                {
                    return false;
                }

                // Create a new FormFile so we can change the name before we pass it into _fileService.
                // We don't want the file to be named as the uploader called it but rather named as the talent's id and the current date as ticks.
                DateTime updatedDate = DateTime.Now;
                string name = talentId + updatedDate.Ticks.ToString();
                file = new Microsoft.AspNetCore.Http.Internal.FormFile(file.OpenReadStream(), 0, file.Length, name, name);

                string url = await _fileService.SaveFile(file, FileType.ProfilePhoto);

                if (!String.IsNullOrWhiteSpace(url))
                {
                    if (!String.IsNullOrWhiteSpace(updatedUser.ProfilePhoto))
                    {
                        await _fileService.DeleteFile(updatedUser.ProfilePhoto, FileType.ProfilePhoto);
                    }

                    // Save the profile photo name in the user document.
                    updatedUser.ProfilePhoto = file.Name;
                    updatedUser.ProfilePhotoUrl = url;
                    updatedUser.UpdatedOn = updatedDate;

                    await _userRepository.Update(updatedUser);

                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        protected void UpdateLanguageFromView(AddLanguageViewModel model, UserLanguage original)
        {
            original.LanguageLevel = model.Level;
            original.Language = model.Name;
        }

        protected void UpdateExperienceFromView(ExperienceViewModel model, UserExperience original)
        {
            original.Company = model.Company;
            original.Position = model.Position;
            original.Responsibilities = model.Responsibilities;
            original.Start = model.Start;
            original.End = model.End;
        }

        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }

        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage language)
        {
            return new AddLanguageViewModel
            {
                Id = language.Id,
                Level = language.LanguageLevel,
                Name = language.Language
            };
        }

        protected ExperienceViewModel ViewModelFromExperience(UserExperience experience)
        {
            return new ExperienceViewModel
            {
                Id = experience.Id,
                Company = experience.Company,
                Position = experience.Position,
                Responsibilities = experience.Responsibilities,
                Start = experience.Start,
                End = experience.End
            };
        }

        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
