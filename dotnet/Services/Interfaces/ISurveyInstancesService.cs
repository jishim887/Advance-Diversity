using Sabio.Models.Domain.Surveys;
using Sabio.Models.Requests.Surveys;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ISurveyInstancesService
    {
        public void AddAnswers(List<SurveyAnswersAddRequest> model);
        public int AddInstance(int surveyId, int userId);
        Survey GetById(int id);
    }
}