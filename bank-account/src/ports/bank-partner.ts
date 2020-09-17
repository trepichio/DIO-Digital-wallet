import BankAccount from "@src/types/bank-account";
import User, { UserBankAccount } from "@src/types/user";


const createAccount = async (_user:User) :Promise<BankAccount> => {
  throw new Error("not implemented");

};

export default {
  createAccount
};