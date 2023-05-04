import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

export function getBaseUrl() {
  // return document.getElementsByTagName('base')[0].href;
  if (environment.production) {
    return getTenantApiUrl();
  } else {
    return environment.app_url;
  }
}

export function getBaseApiUrl() {
  if (environment.production) {
    return getTenantBaseApiUrl();
  } else {
    return environment.baseApiUrl;
  }
}
export function getAuthApiUrl() {
  if (environment.production) {
    return getTenantAuthUrl();
  } else {
    return environment.authApiUrl;
  }
}

export function getReportApiUrl() {
  if (environment.production) {
    return getTenantReportApiUrl();
  } else {
    return environment.reportBaseUrl;
  }
}

const providers = [
  { provide: "BASE_URL", useFactory: getBaseUrl, deps: [] },
  { provide: "AUTH_URL", useFactory: getAuthApiUrl, deps: [] },
  { provide: "REPORT_URL", useFactory: getReportApiUrl, deps: [] },
];
export function getTenantBaseApiUrl() {
  return "https://api." + window.location.hostname + environment.baseApiUrl;
}
export function getTenantAuthUrl() {
  return "https://api." + window.location.hostname + environment.authApiUrl;
}
export function getTenantApiUrl() {
  return "https://api." + window.location.hostname + environment.app_url;
}
export function getTenantReportApiUrl() {
  return "https://api-" + window.location.hostname + environment.reportBaseUrl;
}
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
