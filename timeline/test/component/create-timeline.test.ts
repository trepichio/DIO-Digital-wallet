import {expect} from 'chai';
import { beforeEach, describe, it } from "mocha";
import { stub, restore, SinonStub } from "sinon";
import { v4 } from "uuid";
import timelineRepo from '@src/ports/repos/timeline';
import UserParams from '@src/types/user-params';
import createTimeline from '@src/controllers/create-timeline';

let insertTimeline: SinonStub;

describe('create a timeline', () => {
  beforeEach(() => {
    insertTimeline = stub(timelineRepo,"insert");
  });

  afterEach(() => restore());

  it('persist a timeline in the database', async () => {
    const userParams: UserParams = {
      userId: v4(),
      fullname: 'Somebody'
    };

    await createTimeline(userParams);

    expect(insertTimeline).to.have.been.calledOnce;
  });

  it('return a timeline with events inside of it', async () => {
    const userParams: UserParams = {
      userId: v4(),
      fullname: 'Somebody'
    };

    const timeline = await createTimeline(userParams);

    expect(timeline.events).to.be.an("array").that.has.length(1);
    expect(timeline.events[0].description).to.be.equal("Welcome Somebody")

  });
});