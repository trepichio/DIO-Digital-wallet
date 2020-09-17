import { expect } from 'chai';
import { SinonStub, stub, restore } from "sinon";
import bankPartner from '@src/ports/bank-partner';
import userRepo from '@src/ports/repo/user'
import userBankAccountRepo from '@src/ports/repo/user-bank-account'
import createBankAccount from '@src/controllers/create-bank-account';
import User, { UserBankAccount, UserParams } from '@src/types/user';
import BankAccount from '@src/types/bank-account';
import userBankAccountNotifier from '@src/ports/notifiers/user-bank-account';

let createAccountBankPartner: SinonStub;
let insertUser: SinonStub;
let insertUserBankAccount: SinonStub;
let userBankAccountNotification: SinonStub;

const givenBankAccount: BankAccount = {
  bankCode: "0001",
  accountBranch: "123",
  accountNumber: "1234567"
}


describe('create a bank account', () => {
  beforeEach(() => {
    createAccountBankPartner = stub(bankPartner,"createAccount");
    insertUser = stub(userRepo, "insert");
    insertUserBankAccount = stub(userBankAccountRepo, "insert")

    createAccountBankPartner.resolves(givenBankAccount);

    userBankAccountNotification = stub(userBankAccountNotifier, "created");
  });

afterEach(() => restore() );

  it('call a bank partner to create a bank account', async () => {
    const userParams: UserParams = {
      fullname: 'Somebody'
    };

    await createBankAccount(userParams);

    expect(createAccountBankPartner).to.have.been.calledOnce;
  });

  it('persist user in the database', async () => {
    const userParams :UserParams = {
      fullname: 'Somebody'
    };

    await createBankAccount(userParams);

    expect(insertUser).to.have.been.calledOnce;

    const insertedUser = insertUser.getCall(0).args[0] as User;

    expect(insertedUser.id).to.be.a('string').that.has.length(36);
    expect(insertedUser.fullname).to.be.equal('Somebody');

  });

  it('persist user bank account in the database', async () => {
    const userParams: UserParams = {
      fullname: 'Somebody'
    };

    await createBankAccount(userParams);

    expect(insertUserBankAccount).to.have.been.calledOnce;

    const insertedUserBankAccount = insertUserBankAccount.getCall(0).args[0] as UserBankAccount;

    expect(insertedUserBankAccount.id).to.be.a('string').that.has.length(36);
    expect(insertedUserBankAccount.bankCode).to.be.equal("0001");
    expect(insertedUserBankAccount.accountBranch).to.be.equal("123");
    expect(insertedUserBankAccount.accountNumber).to.be.equal("1234567");

  });

  it('retun a user bank account', async () => {
    const userParams: UserParams = {
      fullname: 'Somebody'
    };

    const userBankAccount = await createBankAccount(userParams);


    expect(userBankAccount.id).to.be.a('string').that.has.length(36);
    expect(userBankAccount.bankCode).to.be.equal("0001");
    expect(userBankAccount.accountBranch).to.be.equal("123");
    expect(userBankAccount.accountNumber).to.be.equal("1234567");

  });

  it('send a notification when a user bank account is created', async () => {
    const userParams: UserParams = {
      fullname: 'Somebody'
    };

    await createBankAccount(userParams);

    expect(userBankAccountNotification).to.be.calledOnce;

  });

});