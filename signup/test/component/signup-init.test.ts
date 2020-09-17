import signupInit from "@src/controllers/signup-init";
import signupRepo from '@src/ports/repos/signup';
import { SignupInitParams } from "@src/types/signup";
import { expect } from "chai";
import { beforeEach } from "mocha";
import { restore, SinonStub, stub } from "sinon";

let insertSignup: SinonStub;

describe('Signup initialization', () => {
  beforeEach(() => {
    insertSignup = stub(signupRepo,"insert").resolves();
  });

  afterEach(() => restore());

  it('return a signup token as response to signup initialization', async () => {
    const signupParams: SignupInitParams =  {
      fullname: "Zé Ruela",
      dateOfBirth: '1988-03-25',
      address: 'Rua das Palmeiras, 123',
    };

    const signup = await signupInit(signupParams);

    expect(signup.token).to.be.a('string').that.has.length(36);
  });

  it('return a signup with init params sent to the function', async () => {
    const signupParams: SignupInitParams =  {
      fullname: "Zé Ruela",
      dateOfBirth: '1988-03-25',
      address: 'Rua das Palmeiras, 123',
    };

    const signup = await signupInit(signupParams);

    expect(signup.initParams).to.be.deep.equal(signupParams)
  });

  it('persist signup in the database', async () => {

    const signupParams: SignupInitParams =  {
      fullname: "Zé Ruela",
      dateOfBirth: '1988-03-25',
      address: 'Rua das Palmeiras, 123',
    };

    const signup = await signupInit(signupParams);

    expect(insertSignup).to.be.calledOnce;
    expect(insertSignup).to.be.calledWith(signup);

  });


});