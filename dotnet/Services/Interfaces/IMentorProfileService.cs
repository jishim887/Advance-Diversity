using Sabio.Models;
using Sabio.Models.Domain.Mentors;
using Sabio.Models.Requests.Mentors;

namespace Sabio.Services.Interfaces
{
    public interface IMentorProfileService
    {
        public Paged<MentorProfile> GetByOptions(int pageIndex, int pageSize, MentorOptions model);
        public Paged<MentorProfile> Search(int pageIndex, int pageSize, string query);
        public Paged<MentorProfile> GetAll(int pageIndex, int pageSize);
        public MentorProfile GetProfile(int userId);
        public void UpdateProfile(MentorProfileUpdateRequest model, int userId);
        public int AddProfile(MentorProfileAddRequest model, int userId);

    }
}