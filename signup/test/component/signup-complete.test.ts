import { expect } from "chai";
import signupComplete from "@src/controllers/signup-complete";
import { restore, SinonStub, stub } from "sinon";
import signupRepo from '@src/ports/repos/signup';
import { beforeEach } from "mocha";
import Signup from "@src/types/signup";
import signupNotifier from '@src/ports/notifiers/signup';

let getByTokenSignup: SinonStub;
let updateStatusSignup: SinonStub;
let completeNotificationSignup: SinonStub;

const signup: Signup = {
  token: 'some-token',
  initParams: {
    fullname: "Someone",
    dateOfBirth: '1982-07-13',
    address: 'Avenue Code, 174',
  },
  status: "IN_PROGRESS"
}

describe('Signup initialization', () => {
  beforeEach(() => {
    getByTokenSignup = stub(signupRepo,"getByToken");
    updateStatusSignup = stub(signupRepo,"updateStatusToken");
    completeNotificationSignup = stub(signupNotifier,"complete");
  });

  afterEach(() => restore());

  it('update signup status to complete', async () => {
    const token = "some-token";

    getByTokenSignup.resolves(signup);

    await signupComplete(token);

    expect(updateStatusSignup).to.have.been.calledWith(signup, "COMPLETE")
  });

  it('send a notification when a signup is complete', async () => {
    const token = "some-token";

    getByTokenSignup.resolves(signup);

    await signupComplete(token);

    expect(completeNotificationSignup).to.have.been.calledOnce;

  });
});