import { ReactElement } from "react";
import { Outlet } from "remix";
import { IMainPageProps } from "../interfaces/main.interface";
import { Banner, LanguageToggle } from "./";

export const Document = ({ languages, locale }: IMainPageProps): ReactElement => (
  <div className="govuk-width-container">
    <main className="govuk-main-wrapper" id="main-content" role="main">
      <Banner />
      <LanguageToggle languages={languages} locale={locale}/>
      <Outlet />
    </main>
  </div>
);
