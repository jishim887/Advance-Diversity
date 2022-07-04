using Sabio.Models.Domain.Donations;
using Sabio.Models.Requests.Donations;

namespace Sabio.Services.Interfaces
{
    public interface IDonationService
    {
        int AddPayment(DonationAddRequest model);
        CurrentUser GetUser(int id);
    }
}