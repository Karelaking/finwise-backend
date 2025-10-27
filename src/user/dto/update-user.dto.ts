import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

type PasswordHasher =
  | 'argon2i'
  | 'argon2id'
  | 'awscognito'
  | 'bcrypt'
  | 'bcrypt_sha256_django'
  | 'md5'
  | 'pbkdf2_sha256'
  | 'pbkdf2_sha256_django'
  | 'pbkdf2_sha1'
  | 'phpass'
  | 'scrypt_firebase'
  | 'scrypt_werkzeug'
  | 'sha256'
  | 'md5_phpass'
  | 'ldap_ssha';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  firstName?: string;

  lastName?: string;

  username?: string;

  password?: string;

  skipPasswordChecks?: boolean;

  signOutOfOtherSessions?: boolean;

  primaryEmailAddressID?: string;

  notifyPrimaryEmailAddressChanged?: boolean;

  primaryPhoneNumberID?: string;

  primaryWeb3WalletID?: string;

  profileImageID?: string;

  totpSecret?: string;

  backupCodes?: string[];

  externalId?: string;

  createdAt?: Date;

  skipLegalChecks?: boolean;

  legalAcceptedAt?: Date;

  locale?: string;

  deleteSelfEnabled?: boolean;

  createOrganizationEnabled?: boolean;

  createOrganizationsLimit?: number;

  publicMetadata?: UserPublicMetadata;
  privateMetadata?: UserPrivateMetadata;
  unsafeMetadata?: UserUnsafeMetadata;

  passwordDigest: string;
  passwordHasher: PasswordHasher;
}
