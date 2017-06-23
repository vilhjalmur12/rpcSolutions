using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(rpcWeb.Startup))]
namespace rpcWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
