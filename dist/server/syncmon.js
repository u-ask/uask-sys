import { S as Store, B as Builder, b as SurveyStoreDriver, a as SurveyReconciliationDriver, c as SampleStoreDriver, P as ParticipantStoreDriver, d as ParticipantSummaryDriver, C as ParticipantMixinDriver, g as InterviewStoreDriver, I as InterviewManagedDriver, F as InterviewMixinDriver, L as __asyncGenerator, M as __await, _ as __awaiter, N as __asyncDelegator, O as __asyncValues, m as config, H as SummaryDbDriver } from './system.js';
import Knex from 'knex';
import { execute, User } from 'uask-dom';
import 'fast-deep-equal';
import 'restana';
import '@sindresorhus/fnv1a';
import 'path';
import 'child_process';
import 'fs';
import 'os';
import 'debug';
import 'stealer';
import 'body-parser';
import 'ejs';
import 'crypto';
import 'oidc-provider';
import 'openid-client';
import 'assert';
import 'uuid-random';

class UserSystemDriver {
    getAll(survey) {
        return this.getByUserId(survey, "").then(u => [u]);
    }
    getByUserId(survey, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new User("system");
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
}
class ReplayDrivers {
    constructor(client) {
        this.client = client;
        this.summaryDriver = {};
        this.auditDriver = {};
        this.documentDriver = {};
        this.kpiDriver = {};
        this.store = new Store(client);
        this.surveyDriver = Builder.decorate(SurveyStoreDriver, this.store)
            .with(SurveyReconciliationDriver)
            .get();
        this.sampleDriver = Builder.decorate(SampleStoreDriver, this.store).get();
        this.userDriver = Builder.decorate(UserSystemDriver).get();
        this.participantDriver = Builder.decorate(ParticipantStoreDriver, this.store)
            .with(ParticipantSummaryDriver, this.client)
            .with(ParticipantMixinDriver, {
            delete: () => {
                throw "Replay driver cannot delete participants";
            },
        })
            .get();
        this.interviewDriver = Builder.decorate(InterviewStoreDriver, this.store)
            .with(InterviewManagedDriver)
            .with(InterviewMixinDriver, {
            delete: () => {
                throw "Replay driver cannot delete interviews";
            },
        })
            .get();
    }
}
class Replay {
    static replay(drivers, survey, p, o) {
        return __asyncGenerator(this, arguments, function* replay_1() {
            const { participants, options } = yield __await(Replay.getArgs(drivers, survey, p, o));
            const interviewCount = participants.reduce((c, p) => c + p.interviews.length, 0);
            const participantCount = participants.length;
            let interviewSofar = 0;
            let participantSofar = 0;
            for (const participant of participants) {
                if (options.rules)
                    yield __await(Replay.replayRules(drivers, survey, participant));
                if (options.summaries)
                    yield __await(drivers.participantDriver.save(survey, participant));
                interviewSofar += participant.interviews.length;
                participantSofar += 1;
                yield yield __await({
                    interviews: { sofar: interviewSofar, count: interviewCount },
                    participants: { sofar: participantSofar, count: participantCount },
                });
            }
            return yield __await(undefined);
        });
    }
    static getArgs(drivers, survey, p, o) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(p)) {
                const options = Object.assign({ rules: true, summaries: false }, o);
                return { participants: p, options };
            }
            const options = Object.assign({ rules: true, summaries: false }, p);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const participants = yield drivers.participantDriver.getAll(survey, samples, {
                limit: Infinity,
            });
            return { participants, options };
        });
    }
    static replayRules(drivers, survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            const synchronized = execute(survey.rules, participant, ["always"]);
            for (let i = 0; i < synchronized.interviews.length; i++) {
                const interview = synchronized.interviews[i];
                yield drivers.interviewDriver.save(survey, synchronized, interview);
            }
        });
    }
}

class ReplayWorker {
    constructor(driverFactory, getOutOfSync, replaySize = 5) {
        this.driverFactory = driverFactory;
        this.getOutOfSync = getOutOfSync;
        this.replaySize = replaySize;
        this.loop = this.makeLoop();
    }
    iterate() {
        return __asyncGenerator(this, arguments, function* iterate_1() {
            const outOfSync = yield __await(this.getOutOfSync());
            for (const [surveyName, participantCodes] of Object.entries(outOfSync)) {
                yield __await(yield* __asyncDelegator(__asyncValues(this.driverFactory(drivers => this.iterateSurvey(drivers, surveyName, participantCodes)))));
            }
        });
    }
    iterateSurvey(drivers, surveyName, participantCodes) {
        return __asyncGenerator(this, arguments, function* iterateSurvey_1() {
            const survey = yield __await(drivers.surveyDriver.getByName(surveyName));
            const samples = yield __await(drivers.sampleDriver.getAll(survey));
            const participants = [];
            for (const participantCode of participantCodes.slice(0, this.replaySize)) {
                const participant = yield __await(drivers.participantDriver.getByParticipantCode(survey, samples, participantCode));
                participants.push(participant);
            }
            yield __await(yield* __asyncDelegator(__asyncValues(Replay.replay(drivers, survey, participants, {
                rules: true,
                summaries: true,
            }))));
        });
    }
    makeLoop() {
        return __asyncGenerator(this, arguments, function* makeLoop_1() {
            while (true) {
                yield __await(yield* __asyncDelegator(__asyncValues(this.iterate())));
                yield yield __await(void 0);
            }
        });
    }
}

var _a;
const replaySliceSize = parseInt((_a = process.env.REPLAY_SLICE_SIZE) !== null && _a !== void 0 ? _a : "5");
const driverFactory = (function () {
    var _a;
    const client = Knex(config[(_a = process.env.APP_ENV) !== null && _a !== void 0 ? _a : "development"]);
    let tx;
    function driverFactory(f) {
        return __asyncGenerator(this, arguments, function* driverFactory_1() {
            tx = yield __await(client.transaction());
            try {
                const drivers = new ReplayDrivers(tx);
                yield __await(yield* __asyncDelegator(__asyncValues(f(drivers))));
                yield __await(tx.commit());
            }
            catch (e) {
                yield __await((tx === null || tx === void 0 ? void 0 : tx.rollback()));
                throw e;
            }
            finally {
                tx = undefined;
            }
        });
    }
    driverFactory.destroy = function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (tx === null || tx === void 0 ? void 0 : tx.rollback());
            yield client.destroy();
            tx = undefined;
        });
    };
    const summaryDriver = new SummaryDbDriver(client);
    driverFactory.getOutOfSync = function () {
        return summaryDriver.getOutOfSync();
    };
    return driverFactory;
})();
const worker = new ReplayWorker(driverFactory, () => driverFactory.getOutOfSync(), replaySliceSize);
process.once("message", () => __awaiter(void 0, void 0, void 0, function* () {
    yield worker.loop.return();
}));
const consume = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const r = yield worker.loop.next().catch(e => worker.loop.return(e));
    if (r.done) {
        if (typeof r.value != "undefined") {
            console.error("Replay worker error:");
            console.error(r.value);
        }
        yield driverFactory.destroy();
        (_b = process.send) === null || _b === void 0 ? void 0 : _b.call(process, "DONE");
    }
    else
        setTimeout(consume, 300);
});
consume();
