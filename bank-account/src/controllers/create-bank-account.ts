import bankPartner from "@src/ports/bank-partner";
import User, { UserParams, UserBankAccount } from "@src/types/user";
import userRepo from '@src/ports/repo/user';
import { v4 } from "uuid";
import userBankAccountRepo from "@src/ports/repo/user-bank-account";
import userBankAccountNotifier from '@src/ports/notifiers/user-bank-account';

export default async (userParams:UserParams) :Promise<UserBankAccount> => {
  const user: User = {
    id: v4(),
    fullname: userParams.fullname
  };

  await userRepo.insert(user);

  const bankAccount = await bankPartner.createAccount(user);

  const userBankAccount: UserBankAccount = {
    id: v4(),
    userId: user.id,
    bankCode: bankAccount.bankCode,
    accountBranch: bankAccount.accountBranch,
    accountNumber: bankAccount.accountNumber
  };

  await userBankAccountRepo.insert(userBankAccount);

  await userBankAccountNotifier.created(userBankAccount);

  return userBankAccount;
};