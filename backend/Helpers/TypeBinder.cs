using System;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs;
using backend.DTOs.Actor;
using backend.DTOs.Genre;
using backend.DTOs.Theater;
using backend.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NetTopologySuite.Geometries;
using Newtonsoft.Json;

namespace backend.Helpers
{
    public class TypeBinder<T> : IModelBinder
    {

        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var properytName = bindingContext.ModelName;
            var value = bindingContext.ValueProvider.GetValue(properytName);

            if (value == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }
            else
            {
                try
                {
                    var deserialized = JsonConvert.DeserializeObject<T>(value.FirstValue);
                    bindingContext.Result = ModelBindingResult.Success(deserialized);
                }
                catch (System.Exception)
                {

                    bindingContext.ModelState.TryAddModelError(properytName, "Given value is not correct format.");
                }

                return Task.CompletedTask;
            }
        }
    }
}
