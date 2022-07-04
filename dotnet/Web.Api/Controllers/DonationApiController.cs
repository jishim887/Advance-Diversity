using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Donations;
using Sabio.Models.Requests.Donations;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/donate")]
    [ApiController]
    public class DonationApiController : BaseApiController
    {
        private IDonationService _service = null;
        private IAuthenticationService<int> _authService = null;

        public DonationApiController(IDonationService service
            , ILogger<DonationApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<ItemResponse<CurrentUser>> GetUser()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                if (userId == 0)
                {
                    code = 404;
                    response = new ErrorResponse("Application user not found.");
                }
                else
                {
                    CurrentUser user = _service.GetUser(userId);

                    if (user == null)
                    {
                        code = 404;
                        response = new ErrorResponse("Application resource not found.");
                    }
                    else
                    {
                        response = new ItemResponse<CurrentUser> { Item = user };
                    }
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<ItemResponse<int>> AddPayment(DonationAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int id = _service.AddPayment(model);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
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
