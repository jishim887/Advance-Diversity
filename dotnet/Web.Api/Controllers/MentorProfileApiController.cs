using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Mentors;
using Sabio.Models.Requests.Mentors;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/mentorprofiles")]
    [ApiController]
    public class MentorProfileApiController : BaseApiController
    {
        private IMentorProfileService _service = null;
        private IAuthenticationService<int> _authService = null;

        public MentorProfileApiController(IMentorProfileService service
            , ILogger<MentorProfileApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [AllowAnonymous]
        [HttpPost("options")]
        public ActionResult<ItemResponse<Paged<MentorProfile>>> GetByOptions(int pageIndex, int pageSize, MentorOptions model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<MentorProfile> result = _service.GetByOptions(pageIndex, pageSize, model);
                if (result == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<MentorProfile>> { Item = result };
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
        [AllowAnonymous]
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<MentorProfile>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<MentorProfile> result = _service.GetAll(pageIndex, pageSize);
                if (result == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<MentorProfile>> { Item = result};
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

        [AllowAnonymous]
        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<MentorProfile>>> Search(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<MentorProfile> result = _service.Search(pageIndex, pageSize, query);
                if (result == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<MentorProfile>> { Item = result };
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

        [HttpGet]
        public ActionResult<ItemResponse<MentorProfile>> GetProfile()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUser().Id;
                MentorProfile profile = _service.GetProfile(userId);
                if (profile == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<MentorProfile>() { Item = profile };
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
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateProfile(MentorProfileUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUser().Id;
                _service.UpdateProfile(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> AddProfile(MentorProfileAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUser().Id;
                int id = _service.AddProfile(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id};
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
