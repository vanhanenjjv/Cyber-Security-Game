using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tietoturvallisuuspeli.Data;
using Tietoturvallisuuspeli.Managers;

namespace Tietoturvallisuuspeli
{
    public class Startup
    {
        public Startup(IConfiguration configuration) =>
            Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<QuestionsContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddTransient<QuestionManager>();

#if NETCOREAPP2_1
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
#else
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
#endif

            services.AddSpaStaticFiles(configuration =>
                configuration.RootPath = "ClientApp/build");
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (!env.IsDevelopment())
                app.Use(async (context, next) =>
                {
                    await Console.Out.WriteLineAsync($"[{DateTime.Now.ToShortTimeString()}] Request path: {context.Request.Path}");
                    await next.Invoke();
                });

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}"));

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                    spa.UseReactDevelopmentServer(npmScript: "start");
            });
        }
    }
}
