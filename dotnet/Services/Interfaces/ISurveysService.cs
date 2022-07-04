using Sabio.Models;
using Sabio.Models.Domain.Surveys;
using Sabio.Models.Requests.Surveys;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface ISurveysService
    {   
        int Add(SurveyAddRequest model, int userId);
        public SurveyAllSelects GetAllSelects();
        public Paged<Survey> Get(int pageIndex, int pageSize);
        public Paged<Survey> Search(int pageIndex, int pageSize, string query);
    }
}