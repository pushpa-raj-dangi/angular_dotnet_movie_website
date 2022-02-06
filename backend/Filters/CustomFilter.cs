using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace backend.Filters
{
    public class CustomFilter : IActionFilter
    {
        private readonly ILogger<CustomFilter> _logger;
        public CustomFilter(ILogger<CustomFilter> logger)
        {
            _logger = logger;

        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogWarning("OnExcutedAction");
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogWarning("On executing...");
        }
    }
}