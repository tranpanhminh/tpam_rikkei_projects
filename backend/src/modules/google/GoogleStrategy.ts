import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

const GOOGLE_CLIENT_IP = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_KEY = process.env.GOOGLE_SECRET_KEY;
const BACKEND_PATH_API = process.env.BACKEND_PATH_API;
// ----------------------------------------

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: GOOGLE_CLIENT_IP,
      clientSecret: GOOGLE_SECRET_KEY,
      callbackURL: `${BACKEND_PATH_API}/users/google/callback`,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
