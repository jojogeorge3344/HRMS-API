using Chef.Common.Core;
using Chef.Common.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace Chef.Finance.Services;

public class DMSService : IDMSService
{
    private readonly ITenantProvider tenantProvider;
    private readonly IHttpContextAccessor httpContextAccessor;

    public DMSService(ITenantProvider tenantProvider, IHttpContextAccessor httpContextAccessor)
    {
        this.tenantProvider = tenantProvider;
        this.httpContextAccessor = httpContextAccessor;
    }

    public async Task<string> SaveFileStream(DocumentFile documentFile, string token)
    {
        return await PostAPIAsync<DocumentFile>($"FileUpload/Save", documentFile, token);
    }

    public async Task<string> SaveAttachment(DocumentFile documentFile, string token)
    {
        return await PostAPIAsync<DocumentFile>($"FileUpload/SaveAttachment", documentFile, token);
    }

    public async Task<string> DeleteAttachment(int fileId)
    {
        return await DeleteById<int>($"FileUpload/Master/DeleteFileById/", fileId);
    }

    public async Task<string> GetAttachment(int fileId)
    {
        return await GetById<string>($"FileUpload/Master/GetFileById/", fileId);
    }
    public string GetHost()
    {
        string Hostname = httpContextAccessor.HttpContext.Request.Host.Value.ToLower();
        return tenantProvider.GetModuleHost("DMS");
    }

    private async Task<string> PostAPIAsync<T>(string path, DocumentFile documentFile, string token)
    {
        StringContent stringContent = new(JsonConvert.SerializeObject(documentFile), Encoding.UTF8, "application/json");
        HttpClientHandler clientHandler = new();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
        using HttpClient httpClient = new(clientHandler);
        string url = GetHost() + path;
        httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage response = await httpClient.PostAsync(url, stringContent);
        if (response.IsSuccessStatusCode)
        {
            string responseContent = response.Content != null ? await response.Content.ReadAsStringAsync() : null;
            return responseContent;
        }
        else
        {
            string responseContent = response.Content != null ? await response.Content.ReadAsStringAsync() : null;
            ErrorDetails error = JsonConvert.DeserializeObject<ErrorDetails>(responseContent);
            throw new Exception(error.Messages.FirstOrDefault());
        }
    }

    public async Task<List<T>> GetAll<T>(string url)
    {
        List<T> obj = new();
        HttpClientHandler clientHandler = new();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

        using (HttpClient client = new(clientHandler))
        {
            client.BaseAddress = new Uri(GetHost());
            HttpResponseMessage httpResponseMessage = await client.GetAsync(url);
            string json1 = httpResponseMessage.Content.ReadAsStringAsync().Result;
            obj = JsonConvert.DeserializeObject<List<T>>(json1);
        }
        return obj;
    }

    public async Task<string> GetById<T>(string url, int id)
    {
        List<T> obj = new();
        string json = "";
        HttpClientHandler clientHandler = new();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
        using (HttpClient client = new(clientHandler))
        {
            client.BaseAddress = new Uri(GetHost());
            HttpResponseMessage httpResponseMessage = client.GetAsync(url + id).Result;
            json = await httpResponseMessage.Content.ReadAsStringAsync();
            //obj = JsonConvert.DeserializeObject<List<T>>(json1);
        }
        return json;
    }

    public async Task<string> DeleteById<T>(string url, int id)
    {
        List<T> obj = new();
        string json = "";
        HttpClientHandler clientHandler = new();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
        using (HttpClient client = new(clientHandler))
        {
            client.BaseAddress = new Uri(GetHost());
            HttpResponseMessage httpResponseMessage = client.DeleteAsync(url + id).Result;
            json = await httpResponseMessage.Content.ReadAsStringAsync();
            //obj = JsonConvert.DeserializeObject<List<T>>(json1);
        }
        return json;
    }
}