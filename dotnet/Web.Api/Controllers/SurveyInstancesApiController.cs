using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Surveys;
using Sabio.Models.Requests.Surveys;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/surveys/forms")]
    [ApiController]
    public class SurveyInstancesApiController : BaseApiController
    {
        private ISurveyInstancesService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyInstancesApiController(ISurveyInstancesService service
            , ILogger<SurveyInstancesApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpPost]
        public ActionResult<SuccessResponse> AddAnswers(List<SurveyAnswersAddRequest> model)
        {
            int code = 201;
            BaseResponse response = null;
            try
            { 
                _service.AddAnswers(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);

            }
            return StatusCode(code, response);
        }
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Survey>> Get(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Survey survey = _service.GetById(id);
                if (survey == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Survey> { Item = survey };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpPost("instance/{id:int}")]
        public ActionResult<ItemResponse<int>> AddInstance(int id)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int instanceId = _service.AddInstance(id, userId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = instanceId };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;

        }

    }
}
