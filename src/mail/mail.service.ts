import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './main.interfaces';
import got from 'got';
import * as FormData from 'form-data';
@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: MailModuleOptions,
  ) {
    // this.sendVerificationEmail('npolly7@gmail.com', '1231241242112');
  }

  private async sendEmail(
    subject: string,
    template: string,
    emailVar: EmailVar[],
  ) {
    const form = new FormData();

    form.append('from', `Kison From Hums <${this.options.fromEmail}>`);
    form.append('to', 'npolly7@gmail.com');
    form.append('subject', subject);
    form.append('template', template);
    let mailGunVar = '';
    emailVar.forEach((eVar) => {
      mailGunVar += `"${eVar.key}":"${eVar.value}",`;
    });
    form.append('h:X-Mailgun-Variables', '{' + mailGunVar.slice(0, -1) + '}');

    try {
      const response = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      console.log(response.body);
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('verify Your Email', 'sample', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
