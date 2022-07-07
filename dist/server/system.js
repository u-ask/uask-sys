import { DomainCollectionImpl, Survey, Page, PageSet, PageItem, Participant, Interview, InterviewItem, Sample, Workflow, SurveyBuilder, PageBuilder, PageSetBuilder, WorkflowBuilder, PageItemBuilder, ParticipantBuilder, InterviewBuilder, InterviewItemBuilder, getTranslation, hasPivot, getItem, getVariableName, Library, execute, messageNames, DomainCollection, User, hasFixedLabels, isMLstring, isML, getItemWording, getItemType, InclusionsBySamples, KPISet, SurveyOptions, formatCode, GlobalScope, getItemContext, ItemTypes } from 'uask-dom';
import deepEqual from 'fast-deep-equal';
import path$1 from 'path';
import 'child_process';
import require$$0 from 'fs';
import require$$0$1 from 'os';
import restana from 'restana';
import fnv from '@sindresorhus/fnv1a';
import debug from 'debug';
import { Stealer } from 'stealer';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import crypto from 'crypto';
import Provider from 'oidc-provider';
import 'openid-client';
import assert from 'assert';
import uuid from 'uuid-random';

var _a, _b;
const development = {
    client: "postgresql",
    connection: JSON.parse((_a = process.env.DB_CONNSTR) !== null && _a !== void 0 ? _a : '{"user":"postgres","host":"localhost","database":"dev"}'),
    migrations: {
        directory: ["./node_modules/uask-auth/db/migrations", "./db/migrations"],
    },
    seeds: {
        directory: ["./node_modules/uask-auth/db/seeds/dev", "./db/seeds/dev"],
    },
};
const demo = {
    client: "better-sqlite3",
    connection: {
        filename: "./db/demo.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
        directory: ["./node_modules/uask-auth/db/migrations", "./db/migrations"],
    },
    seeds: {
        directory: ["./node_modules/uask-auth/db/seeds/dev", "./db/seeds/dev"],
    },
};
const production = {
    client: "postgresql",
    connection: JSON.parse((_b = process.env.DB_CONNSTR) !== null && _b !== void 0 ? _b : '{"user":"postgres","host":"localhost","database":"postgres"}'),
    migrations: {
        directory: ["./node_modules/uask-auth/db/migrations", "./db/migrations"],
    },
    seeds: {
        directory: ["./db/seeds/preprod"],
    },
};
const config = {
    development,
    demo,
    production,
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function trakDeserialize(b, t) {
    b.track({ __keys__: t.__keys__ }, { __changes__: t.__changes__ });
}
function trakDeserializeArray(b, t) {
    for (const i in b) {
        trakDeserialize(b[i], t[i]);
    }
}

function hasChanges(obj) {
    return (typeof obj.__changes__ == "object" &&
        Object.keys(obj.__changes__).length > 0);
}
function resetChanges(current, changes = {}) {
    for (const x in current.__changes__)
        delete current.__changes__[x];
    Object.assign(current.__changes__, changes);
}
function getChanges(target, updated, kwargs) {
    const __changes__ = {};
    let key;
    for (key in kwargs)
        if (shouldTrack(target, updated, key))
            setChangedValue(__changes__, updated, key);
    return __changes__;
}
function shouldTrack(target, kwargs, key) {
    const targetValue = target[key];
    const sourceValue = kwargs[key];
    return isTrackable(targetValue) && !deepEqual(targetValue, sourceValue);
}
function isTrackable(targetValue) {
    return !(targetValue instanceof DomainCollectionImpl);
}
function setChangedValue(__changes__, kwargs, key) {
    __changes__[key] = kwargs[key];
}
function mergeChanges(target, changes) {
    var _a;
    if (!hasChanges({ __changes__: changes }))
        return (_a = target.__changes__) !== null && _a !== void 0 ? _a : {};
    const __changes__ = Object.assign({}, target.__changes__);
    for (const k in changes)
        mergeChange(__changes__, target, changes, k);
    return __changes__;
}
function isChangedInTarget(target, k) {
    return hasChanges(target) && k in target.__changes__;
}
const undef = { undef: true };
function isUndef(obj) {
    const o = typeof obj == "object" ? obj : undefined;
    return o === null || o === void 0 ? void 0 : o.undef;
}
function isOriginalValue(target, changes, k) {
    const original = target.__changes__[k];
    if (changes[k] == undefined)
        return isUndef(original);
    return deepEqual(changes[k], original);
}
function mergeChange(__changes__, target, changes, k) {
    if (isChangedInTarget(target, k)) {
        if (isOriginalValue(target, changes, k))
            delete __changes__[k];
    }
    else {
        const original = target[k];
        __changes__[k] = (original !== null && original !== void 0 ? original : undef);
    }
}

function hasKeys(obj) {
    return (typeof obj.__keys__ == "object" && Object.keys(obj.__keys__).length > 0);
}
function setKeys(obj, keys) {
    Object.assign(obj.__keys__, keys);
}

function isZip(o) {
    return Array.isArray(o);
}
function isZippable(o) {
    return "zip" in o;
}
function weave$1(proto) {
    var _a;
    proto.updateNoTrack =
        (_a = proto.update) !== null && _a !== void 0 ? _a : function (kwargs) {
            return Object.assign(this, kwargs);
        };
    proto.update = function (kwargs) {
        var _a;
        if (isZip(kwargs) && isZippable(this))
            return this.zip(kwargs);
        if (isZip(kwargs))
            throw "zipped type applied to non zippable";
        const { __untrack__, __keys__, __changes__ } = kwargs, others = __rest(kwargs, ["__untrack__", "__keys__", "__changes__"]);
        if (__untrack__) {
            const updated = (_a = this.updateNoTrack) === null || _a === void 0 ? void 0 : _a.call(this, others);
            if (__keys__)
                setKeys(updated, __keys__);
            resetChanges(updated);
            return updated;
        }
        const updated = this.updateNoTrack(kwargs);
        if (this != updated && !hasChanges({ __changes__ })) {
            const __changes__ = getChanges(this, updated, others);
            if (hasChanges({ __changes__ })) {
                const merged = mergeChanges(this, __changes__);
                resetChanges(updated, merged);
            }
        }
        return updated;
    };
    proto.isStale = function (omit = []) {
        if (isNew(this) || isModified(this, omit))
            return freshen;
        return false;
    };
}
function isNew(obj) {
    return !hasKeys(obj);
}
function isModified(obj, omit) {
    var _a;
    return (hasChanges(obj) &&
        !((_a = Object.keys(obj.__changes__)) === null || _a === void 0 ? void 0 : _a.every(c => omit.includes(c))));
}
function freshen(p) {
    return Object.assign({ __keys__: { __flag__: 1 }, __untrack__: true }, p);
}
weave$1(Survey.prototype);
weave$1(Page.prototype);
weave$1(PageSet.prototype);
weave$1(PageItem.prototype);
weave$1(Participant.prototype);
weave$1(Interview.prototype);
weave$1(InterviewItem.prototype);
weave$1(Sample.prototype);
weave$1(Workflow.prototype);

function weave(proto) {
    Object.assign(proto, { __keys__: {}, __changes__: {} });
    proto.track = function (keys, changes) {
        Object.assign(this, keys, changes);
    };
    proto.buildNoTrack = proto.build;
    proto.build = function (...args) {
        const instance = this.buildNoTrack(...args);
        if (hasKeys(this) && this.__keys__ != instance.__keys__)
            setKeys(instance, this.__keys__);
        if (hasChanges(this) && instance.__changes__ != this.__changes__)
            resetChanges(instance, this.__changes__);
        return instance;
    };
}
weave(SurveyBuilder.prototype);
weave(PageBuilder.prototype);
weave(PageSetBuilder.prototype);
weave(WorkflowBuilder.prototype);
weave(PageItemBuilder.prototype);
weave(ParticipantBuilder.prototype);
weave(InterviewBuilder.prototype);
weave(InterviewItemBuilder.prototype);

function interviewItemSerialize(interviewItem, track = true) {
    const { pageItem, value, unit, specialValue, context, messages, __keys__, __changes__ } = interviewItem, node = __rest(interviewItem, ["pageItem", "value", "unit", "specialValue", "context", "messages", "__keys__", "__changes__"]);
    const trackInfos = track ? { __keys__, __changes__ } : {};
    return Object.assign(node, Object.assign({ variableName: pageItem.variableName, instance: pageItem.instance }, trackInfos), typeof value != "undefined"
        ? value instanceof Date
            ? { value: isNaN(value.getTime()) ? undefined : value.toISOString() }
            : { value }
        : {}, unit ? { unit } : {}, specialValue ? { specialValue } : {}, context ? { context } : {}, messages ? { messages } : {});
}
function interviewItemDeserialize(ib, interviewItem) {
    const b = ib
        .item(interviewItem.variableName, interviewItem.instance)
        .context(interviewItem.context);
    if (typeof interviewItem.value != "undefined")
        b.value(interviewItem.value);
    if (typeof interviewItem.unit != "undefined")
        b.unit(interviewItem.unit);
    if (typeof interviewItem.specialValue != "undefined")
        b.specialValue(interviewItem.specialValue);
    if (typeof interviewItem.messages != "undefined")
        b.messages(interviewItem.messages);
    trakDeserialize(b, interviewItem);
}

class InterviewSaveOptions {
    constructor() {
        this.strict = true;
    }
}
const defaultDeleteDriver = {
    delete() {
        throw "Interview suppression not implemented";
    },
};
class InterviewMixinDriver {
    constructor(driver, deleteDriver = defaultDeleteDriver) {
        this.driver = driver;
        this.deleteDriver = deleteDriver;
    }
    save(survey, participant, interview, items, options) {
        return this.driver.save(survey, participant, interview, items, options);
    }
    delete(survey, participant, interview) {
        return this.deleteDriver.delete(survey, participant, interview);
    }
}
function assertNoSubset(interview, items) {
    if (items != interview.items)
        throw "the driver does not support subset save";
}

function interviewSerialize(interview, track = true) {
    const { pageSet, options, items, lastInput, __keys__, __changes__ } = interview, node = __rest(interview, ["pageSet", "options", "items", "lastInput", "__keys__", "__changes__"]);
    const trackInfos = track ? { __keys__, __changes__ } : {};
    return Object.assign(node, Object.assign({ pageSetType: getTranslation(pageSet.type, "__code__", interview.options.defaultLang), items: [...items.map(i => interviewItemSerialize(i, track))], lastInput: lastInput.toISOString() }, trackInfos));
}
function interviewDeserialize(pb, interview) {
    const ib = pb.interview(interview.pageSetType);
    ib.init(interview.nonce, new Date(interview.lastInput));
    ib.items(interview.items);
    trakDeserializeArray(ib.interviewItems, interview.items);
    trakDeserialize(ib, interview);
}

function participantSerialize(participant, track = true) {
    const { interviews, __keys__, __changes__ } = participant, node = __rest(participant, ["interviews", "__keys__", "__changes__"]);
    const trackInfos = track ? { __keys__, __changes__ } : {};
    return Object.assign(node, Object.assign({ interviews: [...interviews.map(p => interviewSerialize(p, track))] }, trackInfos));
}
function participantDeserialize(pb, participant) {
    pb.init(participant.participantCode, participant.sample.sampleCode);
    participant.interviews.forEach(i => {
        interviewDeserialize(pb, i);
    });
    trakDeserialize(pb, participant);
}

function pick(obj) {
    const result = {};
    for (const k in obj) {
        pickone(obj, k, result);
    }
    return result;
}
function pickone(obj, k, result) {
    const v = obj[k];
    if (v !== undefined) {
        if (v instanceof Date)
            result[k] = v.toISOString();
        else
            result[k] = v;
    }
}

function ruleSerialize(rule) {
    return pick(rule);
}
function ruleDeserialize(ib, rule) {
    const args = rule;
    ib.rule(args);
}

function itemDeserialize(pb, item) {
    const qb = pb.question(item.wording, item.variableName, Object.assign({}, item.type));
    if (item.units) {
        const ub = Array.isArray(item.units)
            ? qb.unit(...item.units)
            : qb.unit(...item.units.values);
        if (!Array.isArray(item.units) && item.units.isExtendable)
            ub.extendable();
    }
    if (typeof item.default != "undefined")
        qb.defaultValue(item.default);
    item.rules.forEach(rule => {
        ruleDeserialize(qb, rule);
    });
    if (item.itemComment)
        qb.comment(item.itemComment);
    if (item.pinTitle)
        qb.pin(item.pinTitle);
    if (item.kpiTitle)
        qb.kpi(item.kpiTitle, item.kpiPivot);
    trakDeserialize(qb, item);
}
function itemSerialize(item, track = true) {
    const _a = getItem(item), { instance, rules, type, comment, section, pin, kpi, defaultValue, __keys__, __changes__ } = _a, node = __rest(_a, ["instance", "rules", "type", "comment", "section", "pin", "kpi", "defaultValue", "__keys__", "__changes__"]);
    const trackInfos = track ? { __keys__, __changes__ } : {};
    return Object.assign(node, Object.assign({ type: pick(type), rules: [...rules.map(ruleSerialize)] }, trackInfos), section ? { section } : {}, comment ? { itemComment: comment } : {}, pin ? { pinTitle: pin } : {}, kpi ? { kpiTitle: hasPivot(kpi) ? kpi.title : kpi } : {}, kpi && hasPivot(kpi) ? { kpiPivot: kpi.pivot.variableName } : {}, typeof defaultValue != "undefined" ? { default: defaultValue.value } : {});
}

const noSection = JSON.stringify(undefined);
function pageDeserialize(b, page) {
    const pb = b.page(page.name);
    if (page.exportConfig)
        pb.exportTo(page.exportConfig);
    let section = noSection;
    page.includes.forEach(q => {
        section = libraryDeserialize(pb, q, section);
    });
    section = endSection(pb, section);
    trakDeserialize(pb, page);
}
function libraryDeserialize(pb, q, section) {
    if ("wording" in q) {
        section = startSection(pb, q, section);
        itemDeserialize(pb, q);
    }
    else {
        section = endSection(pb, section);
        const pi = pb.include(q.pageName);
        if (q.variableNames)
            pi.select(...q.variableNames);
        if (q.contexts)
            q.contexts.forEach(c => pi.context(...c));
    }
    return section;
}
function startSection(pb, q, section) {
    const s = JSON.stringify(q.section);
    if (section != s) {
        endSection(pb, section);
        if (s != noSection)
            pb.startSection(q.section);
    }
    return s;
}
function endSection(pb, section) {
    if (section != noSection)
        pb.endSection();
    return noSection;
}
function pageSerialize(page, options, track = true) {
    const { includes, items, exportConfig, __keys__, __changes__ } = page, node = __rest(page, ["includes", "items", "exportConfig", "__keys__", "__changes__"]);
    const trackInfos = track ? { __keys__, __changes__ } : {};
    return Object.assign(node, Object.assign(Object.assign({ includes: [...includes.map(i => librarySerialize(i, options, track))] }, (exportConfig ? { exportConfig } : {})), trackInfos));
}
function librarySerialize(i, options, track = true) {
    if (i instanceof PageItem)
        return itemSerialize(i, track);
    else {
        const { page, pageItems, contexts } = i;
        return Object.assign({
            pageName: getTranslation(page.name, "__code__", options.defaultLang),
        }, pageItems
            ? { variableNames: [...pageItems.map(i => i.variableName)] }
            : {}, contexts ? { contexts: [...contexts.map(contextSerialize)] } : {});
    }
}
function contextSerialize(c) {
    return [c.pageItem.variableName, c.context];
}

function pageSetDeserialize(b, pageSet) {
    const vb = b.pageSet(pageSet.type);
    if (pageSet.datevar)
        vb.datevariable(pageSet.datevar);
    const pageNames = pageSet.pageNames.map(p => { var _a; return ((_a = pageSet.mandatoryPageNames) === null || _a === void 0 ? void 0 : _a.includes(p)) ? { name: p, mandatory: true } : p; });
    if (pageNames.length > 0)
        vb.pages(...pageNames);
    trakDeserialize(vb, pageSet);
}
function pageSetSerialize(pageSet, options, track = true) {
    const { pages, mandatoryPages, datevar, __keys__, __changes__ } = pageSet, node = __rest(pageSet, ["pages", "mandatoryPages", "datevar", "__keys__", "__changes__"]);
    const trackInfos = track ? { __keys__, __changes__ } : {};
    return Object.assign(node, Object.assign({ pageNames: [
            ...pages.map(p => getTranslation(p.name, "__code__", options.defaultLang)),
        ] }, trackInfos), typeof mandatoryPages != "undefined"
        ? {
            mandatoryPageNames: [
                ...mandatoryPages.map(p => getTranslation(p.name, "__code__", options.defaultLang)),
            ],
        }
        : {}, datevar ? { datevar } : {});
}

function workflowSerialize(workflow, options, track = true) {
    const { info, single, many, sequence, stop, main, notifications, __keys__, __changes__ } = workflow, node = __rest(workflow, ["info", "single", "many", "sequence", "stop", "main", "notifications", "__keys__", "__changes__"]);
    const trackInfos = track ? { __keys__, __changes__ } : {};
    return Object.assign(node, Object.assign(Object.assign(Object.assign({}, (info ? { infoType: getPageSetName(info, options) } : {})), { singleTypes: getPageSetNames(single, options), manyTypes: getPageSetNames(many, options), sequenceTypes: getPageSetNames(sequence, options), stopTypes: getPageSetNames(stop, options), notifications: [...notifications] }), trackInfos));
}
function workflowDeserialize(b, workflow) {
    const wb = b.workflow({ name: workflow.name, raw: true });
    if (workflow.infoType)
        wb.home(workflow.infoType);
    wb.n(...workflow.manyTypes);
    wb.seq(...workflow.sequenceTypes);
    wb.end(...workflow.stopTypes);
    wb.one(...workflow.singleTypes);
    wb.notify(...workflow.notifications);
    trakDeserialize(wb, workflow);
}
function getPageSetNames(pageSets, options) {
    return [...pageSets.map(p => getPageSetName(p, options))];
}
function getPageSetName(p, options) {
    return getTranslation(p.type, "__code__", options.defaultLang);
}

function crossRuleSerialize(crossItemRule) {
    const { pageItems, name, when } = crossItemRule, _a = crossItemRule.args, args = __rest(_a, ["rule"]);
    return Object.assign({
        variableNames: [...pageItems.map(i => getVariableName(i))],
        args: ruleSerialize(Object.assign({ name }, args)),
        when,
    });
}
function crossRuleDeserialize(b, crossRule) {
    const { variableNames, args } = crossRule;
    b.rule(variableNames, args).trigger(crossRule.when);
}

function surveyDeserialize(b, survey) {
    b.options(survey.config);
    b.survey(survey.name);
    survey.pageSets.forEach(v => pageSetDeserialize(b, v));
    survey.pages.forEach(p => pageDeserialize(b, p));
    survey.crossRules.forEach(r => crossRuleDeserialize(b, r));
    survey.workflows.forEach(w => workflowDeserialize(b, w));
    trakDeserialize(b, survey);
}
function surveySerialize(survey, track = true) {
    const { options, workflows, pageSets, pages, crossRules, __keys__, __changes__ } = survey, node = __rest(survey, ["options", "workflows", "pageSets", "pages", "crossRules", "__keys__", "__changes__"]);
    const trackInfos = track ? { __keys__, __changes__ } : {};
    return Object.assign(node, Object.assign({ config: options, workflows: [
            ...workflows.map(w => workflowSerialize(w, survey.options, track)),
        ], pageSets: [...pageSets.map(v => pageSetSerialize(v, survey.options, track))], pages: [...pages.map(p => pageSerialize(p, survey.options, track))], crossRules: [...crossRules.map(crossRuleSerialize)] }, trackInfos));
}

const dlog$1 = debug("uask:drivers");
function LoggingProxy(target) {
    if (isNode && !dlog$1.enabled)
        return target;
    const name = Object.getPrototypeOf(target).constructor.name;
    return new Proxy(target, {
        get: (t, p, r) => {
            const q = Reflect.get(t, p, r);
            if (!p.toString().startsWith("get") && !p.toString().startsWith("save"))
                return q;
            return (...args) => __awaiter(this, void 0, void 0, function* () {
                const namespace = `${name}.${String(p)}`;
                dlog$1(namespace, "start");
                const result = yield q.call(t, ...args);
                dlog$1(namespace, "end");
                return result;
            });
        },
    });
}
const isNode = typeof (process === null || process === void 0 ? void 0 : process.hrtime) == "function";

function isFtor(o) {
    return !o.prototype || !o.prototype.constructor.name;
}
function asFtor(o) {
    if (isFtor(o))
        return o;
    return (...a) => new o(...a);
}
class Builder {
    constructor(ftor, args) {
        this.ftor = ftor;
        this.args = args;
    }
    with(ftor, ...args) {
        return new Builder((...a) => asFtor(ftor)(this.ftor(...this.args), ...a), args);
    }
    withLogging(on = true) {
        if (on)
            return new Builder((...a) => LoggingProxy(this.ftor(...a)), this.args);
        return this;
    }
    get() {
        if (typeof this.__driver == "undefined")
            this.__driver = this.ftor(...this.args);
        return this.__driver;
    }
    static decorate(ftor, ...args) {
        return new Builder(asFtor(ftor), args);
    }
}

function extractSurvey(survey) {
    const checkVersion = getVersionChecker(survey);
    if (checkVersion) {
        return extractSurvey4Version(survey, checkVersion);
    }
    return survey;
}
function extractSurvey4Version(survey, checkVersion) {
    const surveyNode = surveySerialize(survey);
    const pageNodes = getPageNodes4Version(survey, checkVersion);
    const pageSetNodes = getPageSetNodes4Version(survey, checkVersion);
    const workflowNodes = getWorkflowNodes4Version(survey, checkVersion);
    return reconstructSurvey(surveyNode, pageNodes, pageSetNodes, workflowNodes);
}
function getVersionChecker(survey) {
    var _a;
    const surveyVersion = (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.version;
    return surveyVersion
        ? (k) => { var _a; return ((_a = k.__keys__) === null || _a === void 0 ? void 0 : _a.version) == surveyVersion; }
        : undefined;
}
function getPageNodes4Version(survey, checkVersion) {
    return survey.pages
        .filter(checkVersion)
        .update(p => extractPage4Version(p, checkVersion))
        .map(p => pageSerialize(p, survey.options));
}
function extractPage4Version(page, checkVersion) {
    return page.update({
        includes: page.includes
            .filter(i => i instanceof PageItem
            ? checkVersion(i)
            : checkLibraryVersion(i, checkVersion))
            .map(i => extractPageItem4Version(i, checkVersion)),
    });
}
function checkLibraryVersion(l, checkVersion) {
    var _a;
    return ((l.pageItems == undefined || l.pageItems.some(checkVersion)) &&
        (l.contexts == undefined || ((_a = l.contexts) === null || _a === void 0 ? void 0 : _a.some(c => checkVersion(c.pageItem)))));
}
function extractPageItem4Version(i, checkVersion) {
    var _a, _b;
    return i instanceof PageItem
        ? i
        : new Library(i.page, (_a = i.pageItems) === null || _a === void 0 ? void 0 : _a.filter(checkVersion), (_b = i.contexts) === null || _b === void 0 ? void 0 : _b.filter(c => checkVersion(c.pageItem)));
}
function getPageSetNodes4Version(survey, checkVersion) {
    return survey.pageSets
        .filter(checkVersion)
        .update(p => extractPageSet4Version(p, checkVersion))
        .map(p => pageSetSerialize(p, survey.options));
}
function extractPageSet4Version(pageSet, checkVersion) {
    return pageSet.update({
        pages: pageSet.pages.filter(checkVersion),
    });
}
function getWorkflowNodes4Version(survey, checkVersion) {
    return survey.workflows
        .filter(checkVersion)
        .map(w => extractWorkflow4Version(w, checkVersion))
        .map(w => workflowSerialize(w, survey.options));
}
function extractWorkflow4Version(workflow, checkVersion) {
    return workflow.update({
        single: workflow.single.filter(checkVersion),
        many: workflow.many.filter(checkVersion),
        sequence: workflow.sequence.filter(checkVersion),
        stop: workflow.stop.filter(checkVersion),
    });
}
function reconstructSurvey(surveyNode, pageNodes, pageSetNodes, workflowNodes) {
    const surveyBuilder = new SurveyBuilder();
    surveyDeserialize(surveyBuilder, Object.assign(Object.assign({}, surveyNode), { pages: [...pageNodes], pageSets: [...pageSetNodes], workflows: [...workflowNodes] }));
    return surveyBuilder.build();
}
function extractInterview(interview) {
    const items = interview.items.filter(i => interview.pageSet.getPagesForItem(i).length > 0);
    return interview.update({ items });
}
function extractParticipant4Survey(participant, survey) {
    const interviews = participant.interviews
        .filter(i => survey.pageSets.includes(i.pageSet))
        .map(i => extractInterview(i));
    return participant.update({ interviews });
}

class KeyMapper {
    constructor(driver, surveyName) {
        this.survey = driver.getByName(surveyName).catch(r => {
            return r.message == "unknown survey" ? undefined : Promise.reject(r);
        });
    }
    getSurveyKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.survey.then(s => { var _a; return (_a = s === null || s === void 0 ? void 0 : s.__keys__) !== null && _a !== void 0 ? _a : {}; });
        });
    }
    getWorkflowKeys(workflow) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.survey.then(survey => { var _a, _b; return (_b = (_a = survey === null || survey === void 0 ? void 0 : survey.workflows.find(w => w.name == workflow.name)) === null || _a === void 0 ? void 0 : _a.__keys__) !== null && _b !== void 0 ? _b : {}; });
        });
    }
    getPageSetKeys(pageSet) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.survey.then(survey => {
                var _a, _b;
                return (_b = (_a = survey === null || survey === void 0 ? void 0 : survey.pageSets.find(pS => getTranslation(pS.type, "__code__", survey.options.defaultLang) ==
                    getTranslation(pageSet.type, "__code__", survey.options.defaultLang))) === null || _a === void 0 ? void 0 : _a.__keys__) !== null && _b !== void 0 ? _b : {};
            });
        });
    }
    getPageKeys(pageName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.survey.then(survey => {
                var _a, _b;
                return (_b = (_a = survey === null || survey === void 0 ? void 0 : survey.pages.find(page => getTranslation(page.name, "__code__", survey.options.defaultLang) ==
                    getTranslation(pageName, "__code__", survey.options.defaultLang))) === null || _a === void 0 ? void 0 : _a.__keys__) !== null && _b !== void 0 ? _b : {};
            });
        });
    }
    getPageItemKeys(variableName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.survey.then(survey => {
                var _a, _b;
                return (_b = (_a = survey === null || survey === void 0 ? void 0 : survey.items.find(item => item.variableName == variableName)) === null || _a === void 0 ? void 0 : _a.__keys__) !== null && _b !== void 0 ? _b : {};
            });
        });
    }
}

function reconcileSurvey(driver, survey) {
    return __awaiter(this, void 0, void 0, function* () {
        const reconciler = yield getReconcilier(driver, survey);
        if (reconciler) {
            reconcileSurveyKeys(survey, ...reconciler);
            yield reconcileWorkflowKeys(survey, ...reconciler);
            yield reconcilePageSetKeys(survey, ...reconciler);
            yield reconcilePageKeys(survey, ...reconciler);
            yield reconcilePageItemKeys(survey, ...reconciler);
        }
        return survey;
    });
}
function getReconcilier(driver, survey) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyMapper = new KeyMapper(driver, survey.name);
        const surveyKeys = yield keyMapper.getSurveyKeys();
        if (surveyKeys) {
            const versionSetter = getVersionSetter(surveyKeys);
            return [keyMapper, versionSetter];
        }
    });
}
function getVersionSetter(surveyKeys) {
    var _a;
    const surveyVersion = { version: ((_a = surveyKeys === null || surveyKeys === void 0 ? void 0 : surveyKeys.version) !== null && _a !== void 0 ? _a : 0) + 1 };
    return (k) => {
        return Object.assign(k, surveyVersion);
    };
}
function reconcileSurveyKeys(survey, keyMapper, setVersion) {
    return __awaiter(this, void 0, void 0, function* () {
        const surveyKeys = yield keyMapper.getSurveyKeys();
        survey.update({
            __keys__: setVersion(surveyKeys),
            __untrack__: true,
        });
    });
}
function reconcileWorkflowKeys(survey, keyMapper, setVersion) {
    return Promise.all(survey.workflows.map((w) => __awaiter(this, void 0, void 0, function* () {
        const dbKeys = yield keyMapper.getWorkflowKeys(w).then(setVersion);
        w.update({ __keys__: dbKeys, __untrack__: true });
    })));
}
function reconcilePageSetKeys(survey, keyMapper, setVersion) {
    return Promise.all(survey.pageSets.map((pS) => __awaiter(this, void 0, void 0, function* () {
        const dbKeys = yield keyMapper.getPageSetKeys(pS).then(setVersion);
        pS.update({ __keys__: dbKeys, __untrack__: true });
    })));
}
function reconcilePageKeys(survey, keyMapper, setVersion) {
    return Promise.all(survey.pages.map((p) => __awaiter(this, void 0, void 0, function* () {
        const dbKeys = yield keyMapper.getPageKeys(p.name).then(setVersion);
        p.update({ __keys__: dbKeys, __untrack__: true });
    })));
}
function reconcilePageItemKeys(survey, keyMapper, setVersion) {
    return Promise.all(survey.items.map((i) => __awaiter(this, void 0, void 0, function* () {
        const dbKeys = yield keyMapper
            .getPageItemKeys(i.variableName)
            .then(setVersion);
        i.update({ __keys__: dbKeys, __untrack__: true });
    })));
}

class SurveyReconciliationDriver {
    constructor(driver) {
        this.driver = driver;
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield this.driver.getByName(name);
            return extractSurvey(survey);
        });
    }
    save(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!/[-@]/.test(survey.name))
                throw "survey name must contain a dash (-)";
            yield reconcileSurvey(this.driver, survey);
            return this.driver.save(survey);
        });
    }
}
class ParticipantReconciliationDriver {
    constructor(driver) {
        this.driver = driver;
    }
    getAll(survey, samples, options = {}) {
        return this.driver
            .getAll(survey, samples, options)
            .then(r => r.map(p => extractParticipant4Survey(p, survey)));
    }
    getByParticipantCode(survey, samples, participantCode) {
        return this.driver
            .getByParticipantCode(survey, samples, participantCode)
            .then(p => extractParticipant4Survey(p, survey));
    }
    getBySample(survey, sample, options = {}) {
        return this.driver
            .getBySample(survey, sample, options)
            .then(r => r.map(p => extractParticipant4Survey(p, survey)));
    }
    save(survey, participant) {
        return this.driver.save(survey, participant);
    }
}

class UaskError extends Error {
    constructor(err) {
        var _a;
        const constraintErrors = ["SQLITE_CONSTRAINT", "23505"];
        if (constraintErrors.includes((_a = err.code) !== null && _a !== void 0 ? _a : ""))
            super("Failed to register - MUST BE UNIQUE");
        else
            super(err.message);
        this.name = "UaskError";
    }
}
function errorMessage(message, statusCode) {
    return {
        message: message,
        statusCode: statusCode !== null && statusCode !== void 0 ? statusCode : 400,
    };
}

class SampleCacheDriver {
    constructor(driver) {
        this.driver = driver;
    }
    static _init() {
        SampleCacheDriver.cache = new Stealer({
            ttl: 600,
            unref: true,
        });
    }
    getAll(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedSamples = SampleCacheDriver.cache.get(survey.name);
            if (typeof cachedSamples != "undefined")
                return cachedSamples;
            const samples = yield this.driver.getAll(survey);
            SampleCacheDriver.cache.set(survey.name, samples);
            return samples;
        });
    }
    getBySampleCode(survey, sampleCode) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const samples = yield this.getAll(survey);
            return ((_a = samples.find(s => s.sampleCode == sampleCode)) !== null && _a !== void 0 ? _a : Promise.reject([errorMessage("unknown sample")]));
        });
    }
    save(survey, sample) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.driver.save(survey, sample);
            SampleCacheDriver.cache.delete(survey.name);
            return keys;
        });
    }
}
SampleCacheDriver._init();

class SurveyCacheDriver {
    constructor(driver) {
        this.driver = driver;
    }
    getByName(name) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const cachedSurvey = SurveyCacheDriver.cache.get(name);
            if (this.isCurrentSurvey(cachedSurvey))
                return cachedSurvey;
            const survey = yield this.driver.getByName(name);
            SurveyCacheDriver.cache.set(name, survey);
            if (!SurveyCacheDriver.currentVersion.has(name))
                SurveyCacheDriver.currentVersion.set(name, (_b = (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : 0);
            return survey;
        });
    }
    isCurrentSurvey(survey) {
        var _a;
        if (typeof survey == "undefined")
            return false;
        if (SurveyCacheDriver.currentVersion.has(survey.name))
            return (SurveyCacheDriver.currentVersion.get(survey.name) ==
                ((_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.version));
        return true;
    }
    save(survey) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.driver.save(survey);
            SurveyCacheDriver.cache.delete(survey.name);
            SurveyCacheDriver.currentVersion.set(survey.name, (_b = (_a = keys.__keys__) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : 0);
            return keys;
        });
    }
}
SurveyCacheDriver.cache = new Stealer({ ttl: 7200, unref: true });
SurveyCacheDriver.currentVersion = new Map();

class ParticipantCacheDriver {
    constructor(driver, sampleDriver) {
        this.driver = driver;
        this.sampleDriver = sampleDriver;
    }
    static _init() {
        ParticipantCacheDriver.cache = new Stealer({
            ttl: 120,
            unref: true,
        });
    }
    getAll(survey, samples, options) {
        return this.driver.getAll(survey, samples, options);
    }
    getBySample(survey, sample, options) {
        return this.driver.getBySample(survey, sample, options);
    }
    getByParticipantCode(survey, samples, participantCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const participant = ParticipantCacheDriver.get(survey, participantCode);
            if (participant) {
                const sample = yield this.sampleDriver.getBySampleCode(survey, participant.sample.sampleCode);
                return participant.update({ sample });
            }
            const fetched = yield this.driver.getByParticipantCode(survey, samples, participantCode);
            ParticipantCacheDriver.set(survey, fetched);
            return fetched;
        });
    }
    save(survey, participant) {
        ParticipantCacheDriver.del(survey, participant);
        return this.driver.save(survey, participant);
    }
    delete(survey, participant) {
        ParticipantCacheDriver.del(survey, participant);
        return this.driver.delete(survey, participant);
    }
    static key(survey, participantCode) {
        return `${survey.name}::${participantCode}`;
    }
    static get(survey, participantCode) {
        var _a, _b;
        const k = ParticipantCacheDriver.key(survey, participantCode);
        const pat = ParticipantCacheDriver.cache.get(k);
        if (pat && pat.surveyVersion != ((_b = (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : 0)) {
            ParticipantCacheDriver.cache.delete(k);
            return undefined;
        }
        return pat === null || pat === void 0 ? void 0 : pat.participant;
    }
    static set(survey, participant) {
        var _a, _b;
        const k = ParticipantCacheDriver.key(survey, participant.participantCode);
        ParticipantCacheDriver.cache.set(k, {
            participant,
            surveyVersion: (_b = (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : 0,
        });
    }
    static del(survey, participant) {
        const k = ParticipantCacheDriver.key(survey, participant.participantCode);
        ParticipantCacheDriver.cache.delete(k);
    }
}
ParticipantCacheDriver._init();

class InterviewRuleDriver {
    constructor(driver, participantDriver, participantCache) {
        this.driver = driver;
        this.participantDriver = participantDriver;
        this.participantCache = participantCache;
    }
    save(survey, participant, interview, items = interview.items, options = new InterviewSaveOptions()) {
        return __awaiter(this, void 0, void 0, function* () {
            assertNoSubset(interview, items);
            const updated = this.updateParticipant(participant, interview);
            const synchronized = this.executeRules(survey, updated, interview);
            const allKeys = yield this.saveAll(survey, synchronized, options);
            const interviewIndex = this.findInterviewIndex(updated, interview);
            return this.getKeysWithItemValues(allKeys[interviewIndex], synchronized.interviews[interviewIndex]);
        });
    }
    updateParticipant(participant, interview) {
        return participant.update({
            interviews: interview.nonce == 0
                ? participant.interviews.append(interview)
                : participant.interviews.update(i => interview.nonce == i.nonce ? interview : i),
        });
    }
    saveAll(survey, participant, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const participantKeys = yield this.participantDriver.save(survey, participant);
            const interviewKeys = [];
            for (const interview of participant.interviews) {
                const keys = yield this.driver.save(survey, participant, interview, undefined, options);
                interviewKeys.push(keys);
            }
            const interviews = participant.interviews.map((i, x) => i.update(interviewKeys[x]));
            this.participantCache.set(survey, participant.update(Object.assign(Object.assign({}, participantKeys), { interviews })));
            return interviewKeys;
        });
    }
    getKeysWithItemValues(keys, i) {
        const items = this.addItemValues(keys[1].items, i);
        return [keys[0], { items }];
    }
    addItemValues(ret, i) {
        return ret.map((k, x) => {
            const _a = i.items[x], o = __rest(_a, ["__changes__", "pageItem"]);
            return Object.assign(Object.assign(Object.assign({}, k), o), { __untrack__: true });
        });
    }
    findInterviewIndex(participant, interview) {
        return participant.interviews.findIndex((_, i, interviews) => this.isIthInterview(interviews, i, interview));
    }
    isIthInterview(interviews, i, interview) {
        return ((interview.nonce == 0 && i == interviews.length - 1) ||
            interviews[i].nonce == interview.nonce);
    }
    delete(survey, participant, interview) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.driver.delete(survey, participant, interview);
            const updated = participant.update({
                interviews: participant.interviews.delete(i => i.nonce == interview.nonce),
            });
            const synchronized = this.executeRules(survey, updated);
            yield this.saveAll(survey, synchronized, { strict: false });
        });
    }
    executeRules(survey, updated, interview) {
        return execute(survey.rules, updated, ["always"], interview);
    }
}

class InterviewManagedDriver {
    constructor(driver) {
        this.driver = driver;
    }
    save(survey, participant, interview, items = interview.items, options = new InterviewSaveOptions()) {
        return __awaiter(this, void 0, void 0, function* () {
            assertNoSubset(interview, items);
            const ret = [
                {},
                {
                    items: new Array(items.length).fill({}),
                },
            ];
            const changedItems = this.getChanged(items);
            if (this.somethingChanged(interview, changedItems)) {
                const keys = yield this.driver.save(survey, participant, interview, items.filter((_, ix) => changedItems.includes(ix)), options);
                this.buildResult(ret, keys, changedItems);
            }
            return ret;
        });
    }
    buildResult(ret, keys, imap) {
        ret[0] = keys[0];
        for (const [i, x] of imap.entries())
            ret[1].items[x] = keys[1].items[i];
    }
    getChanged(oo) {
        return oo.reduce((acc, o, ix) => (isManaged(o) ? acc.append(ix) : acc), DomainCollection());
    }
    somethingChanged(interview, changedItems) {
        return (hasChanges(interview) || !hasKeys(interview) || changedItems.length > 0);
    }
}
function isManaged(o) {
    return hasKeys(o)
        ? hasChanges(o)
        : !(o instanceof InterviewItem) || hasValue(o);
}
function hasValue(interviewItem) {
    return (typeof interviewItem.value != "undefined" ||
        typeof interviewItem.specialValue != "undefined" ||
        messageNames(interviewItem.messages).length > 0 ||
        typeof interviewItem.unit != "undefined");
}

var isWsl$2 = {exports: {}};

const fs$1 = require$$0;
let isDocker$1;
function hasDockerEnv() {
	try {
		fs$1.statSync('/.dockerenv');
		return true;
	} catch (_) {
		return false;
	}
}
function hasDockerCGroup() {
	try {
		return fs$1.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
	} catch (_) {
		return false;
	}
}
var isDocker_1 = () => {
	if (isDocker$1 === undefined) {
		isDocker$1 = hasDockerEnv() || hasDockerCGroup();
	}
	return isDocker$1;
};

const os = require$$0$1;
const fs = require$$0;
const isDocker = isDocker_1;
const isWsl$1 = () => {
	if (process.platform !== 'linux') {
		return false;
	}
	if (os.release().toLowerCase().includes('microsoft')) {
		if (isDocker()) {
			return false;
		}
		return true;
	}
	try {
		return fs.readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft') ?
			!isDocker() : false;
	} catch (_) {
		return false;
	}
};
if (process.env.__IS_WSL_TEST__) {
	isWsl$2.exports = isWsl$1;
} else {
	isWsl$2.exports = isWsl$1();
}

var defineLazyProp = (object, propertyName, fn) => {
	const define = value => Object.defineProperty(object, propertyName, {value, enumerable: true, writable: true});
	Object.defineProperty(object, propertyName, {
		configurable: true,
		enumerable: true,
		get() {
			const result = fn();
			define(result);
			return result;
		},
		set(value) {
			define(value);
		}
	});
	return object;
};

const path = path$1;
const isWsl = isWsl$2.exports;
const defineLazyProperty = defineLazyProp;
path.join(__dirname, 'xdg-open');
const {platform, arch} = process;
function detectArchBinary(binary) {
	if (typeof binary === 'string' || Array.isArray(binary)) {
		return binary;
	}
	const {[arch]: archBinary} = binary;
	if (!archBinary) {
		throw new Error(`${arch} is not supported`);
	}
	return archBinary;
}
function detectPlatformBinary({[platform]: platformBinary}, {wsl}) {
	if (wsl && isWsl) {
		return detectArchBinary(wsl);
	}
	if (!platformBinary) {
		throw new Error(`${platform} is not supported`);
	}
	return detectArchBinary(platformBinary);
}
const apps = {};
defineLazyProperty(apps, 'chrome', () => detectPlatformBinary({
	darwin: 'google chrome',
	win32: 'chrome',
	linux: ['google-chrome', 'google-chrome-stable', 'chromium']
}, {
	wsl: {
		ia32: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
		x64: ['/mnt/c/Program Files/Google/Chrome/Application/chrome.exe', '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe']
	}
}));
defineLazyProperty(apps, 'firefox', () => detectPlatformBinary({
	darwin: 'firefox',
	win32: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
	linux: 'firefox'
}, {
	wsl: '/mnt/c/Program Files/Mozilla Firefox/firefox.exe'
}));
defineLazyProperty(apps, 'edge', () => detectPlatformBinary({
	darwin: 'microsoft edge',
	win32: 'msedge',
	linux: ['microsoft-edge', 'microsoft-edge-dev']
}, {
	wsl: '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
}));

class Account {
  constructor(userid, surveys, args) {
    Object.assign(this, args);
    this.userid = userid;
    this.surveys = surveys;
    this.magic = args.password
      ? Buffer.from(JSON.stringify([userid, args.password])).toString("base64")
      : undefined;
  }
  static create(account) {
    return new Account(account.userid, JSON.parse(account.surveys), {
      sub: account.id,
      email_verified: !!account.email_verified,
      given_name: account.given_name,
      surname: account.surname,
      title: account.title,
      phone: account.phone,
      id: account.id,
      email: account.email,
      password: account.password,
      salt: account.salt,
      extra_infos: JSON.parse(account.extra_infos),
    });
  }
}
class AccountManager {
  constructor(client) {
    this.client = client;
  }
  authenticate({ method, email, password, magic, userid, code, role }) {
    if (method == "magic") {
      method = "password";
      const [u, p] = JSON.parse(Buffer.from(magic, "base64").toString());
      userid = u;
      password = p;
    }
    return this.tryAuthenticate(
      method,
      email?.trim(),
      password?.trim(),
      userid?.trim(),
      code?.trim(),
      role
    ).catch(() => {});
  }
  tryAuthenticate(method, email, password, userid, code, role) {
    return !method || method == "password"
      ? this.passwordAuthenticate(email ?? userid, password)
      : method.startsWith("code")
      ? this.codeAuthenticate(userid, code)
      : this.roleAuthenticate(role);
  }
  async passwordAuthenticate(email, password) {
    assert(password, "Password must be provided");
    assert(email, "email must be provided");
    const account = await this.getByUserid(email);
    const h = await hash(password, account.salt);
    assert(h == account.password, `Invalid credentials provided`);
    return account.id;
  }
  async codeAuthenticate(userid, code) {
    assert(code, "Code must be provided");
    const { tries, code: c, name, surname, organization, role, phone } = getCode(userid);
    if (tries > 0) setCode(userid, c, tries - 1);
    else delCode(userid);
    assert(tries > 0 && code == c, "Invalid code provided");
    const account = await this.getByUserid(userid);
    if (account) return account.id;
    const newAccount = new Account(
      userid,
      {},
      {
        email: userid,
        email_verified: true,
        given_name: name,
        surname,
        phone,
        extra_infos: { organization, role },
      }
    );
    const saved = await this.save(newAccount);
    return saved.id;
  }
  async roleAuthenticate(role) {
    assert(role, "Role must be provided");
    const account = await this.getByUserid(role);
    return account.id;
  }
  async findOIDCAccount(ctx, id) {
    const account = await this.getById(id);
    return AccountManager.accountWithClaims(account);
  }
  static accountWithClaims(account) {
    return account
      ? {
          accountId: account.id,
          async claims() {
            return Account.create(account);
          },
        }
      : undefined;
  }
  async getBySurvey(survey) {
    const all = await this.getAll();
    return all.filter(a => Object.keys(a.surveys).includes(survey));
  }
  async getById(id) {
    return await this.client
      .table("accounts")
      .where({ id: id })
      .then(r => r[0]);
  }
  async getByUserid(userid) {
    const uid = String(userid).toLowerCase();
    const result = await this.client
      .table("accounts")
      .where({ userid: uid })
      .select()
      .first();
    const account = result ? Account.create(result) : undefined;
    return account;
  }
  async getAll() {
    const allAccounts = await this.client.table("accounts");
    return allAccounts.map(Account.create);
  }
  async save(account) {
    const password = await passwordRecord(account.password);
    const record = accountRecord(account, password);
    const c = await this.client
      .table("accounts")
      .where("id", "!=", record.id)
      .andWhere("userid", record.userid)
      .count({ count: "*" })
      .first();
    if (c.count > 0)
      return Promise.reject(`Account ${record.userid} already exists`);
    await this.client.table("accounts").insert(record).onConflict("id").merge();
    return Object.assign(account, { id: record.id });
  }
}
const codes = new Stealer({ ttl: 600, unref: true });
function getCode(userid) {
  const lowercased = String(userid).toLowerCase();
  return codes.get(lowercased);
}
function setCode(userid, code, tries, kwargs) {
  const lowercased = String(userid).toLowerCase();
  codes.set(lowercased, { tries, code, ...kwargs });
}
function delCode(userid) {
  const lowercased = String(userid).toLowerCase();
  codes.delete(lowercased);
}
async function generateCode({ userid, name, surname, organization, role, phone }) {
  const code = await randomCode();
  setCode(userid, code, 3, { name, surname, organization, role, phone });
  return code;
}
function randomCode() {
  const a = new Uint32Array(6);
  return new Promise((res, rej) =>
    crypto.randomFill(a, (err, buf) => {
      if (err) rej(err);
      const code = createCode(buf);
      res(code);
    })
  );
}
function createCode(buf) {
  const symbols = "0123456789";
  const code = buf.map(i => symbols[i % symbols.length]).join("");
  return code;
}
async function passwordRecord(password) {
  if (!password) return {};
  const salt = crypto.randomBytes(16).toString("hex");
  const h = await hash(password, salt);
  return { salt, password: h };
}
async function hash(password, salt) {
  return new Promise(r =>
    crypto.pbkdf2(password, salt, 10000, 64, "sha512", (err, h) =>
      r(h.toString("hex"))
    )
  );
}
function accountRecord(account, password) {
  return {
    id: account.id ?? uuid(),
    userid: String(account.userid ?? account.email).toLowerCase(),
    email: account.email,
    email_verified: account.email_verified,
    given_name: account.given_name,
    surname: account.surname,
    title: account.title,
    phone: account.phone,
    surveys:
      typeof account.surveys == "string"
        ? account.surveys
        : JSON.stringify(account.surveys),
    ...password,
    extra_infos:
      typeof account.extra_infos == "string"
        ? account.extra_infos
        : JSON.stringify(account.extra_infos),
  };
}
function loginTemplate (method, nonce) {
  return `<!DOCTYPE html>
  <html >
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <title>Sign-in</title>
      <link rel="stylesheet" href="/style/style.css">
    </head>
    <body>
      <script nonce="${nonce}" type="module">
        import { i18n, Login, h, createApp } from "/app.vue.js";

        const app = createApp({
          render() {
            return h(Login, {
              title: "<%= locals.title %>", 
              subtitle: "<%= locals.subtitle %>", 
              saasMode: "<%= locals.saasMode %>", 
              uid: "<%= locals.uid %>",
              method: "${method}",
              loginHint: "<%= locals.params.login_hint %>",
              flash: "<%= locals.flash %>"
            })
          }
        });
        app.use(i18n)
        app.mount("#app");
      </script>
      <div id="app">
      </div>
    </body>
  </html>`;
}
function consentTemplate () {
  return `<!DOCTYPE html>
  <html >
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Consent</title>
    </head>
    <body>
      <div class="modal d-block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="card-title mb-3"><%= locals.title %></h5>
            </div>
              <% if (params.scope && params.scope.includes('offline_access')) { %>
                <div class="alert alert-danger m-3">
                  The client is asking to have offline access : it will be able to access permanently to the backend resource
                </div>
              <% } %>
              <form autocomplete="off" action="/oidc/interaction/<%= uid %>/confirm" method="post">
                <div class="modal-footer">
                  <button id="consent" autofocus type="submit" class="btn btn-primary float-end">Continue</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  </html>`
}
function logout(form) {
  return `<!DOCTYPE html>
    <head>
      <title>Logout Request</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
      <style>
        body {
          color: white;
        }
        .modal {
          background-color: #2d3252 !important;
        }
        .modal-content {
          background: linear-gradient(0.75turn, #002bb5, #1a55a1);
          box-shadow: 0px 0px 10px black !important;
          height: 100% !important;
          position: absolute;
        }
        .modal-dialog {
          max-width: 30% !important;
          min-height: 30% !important;
          top: 20% !important;
          position: relative !important;
        }
        .btn-danger {
          background-color: #a00007 !important;
        }
        .btn {
          font-size: 1.25rem !important;
        }
        @media only screen and (max-width: 992px) {
          .modal-dialog {
            max-width: 95% !important;
          }
        }
      </style>
    </head>
    <body>
      <div>${form}</div>
      <div class="modal d-block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-0 col">
              <h4 class="card-title mb-3 mx-auto">Sign out ?</h5>
            </div>
            <div class="modal-body border-0 d-grid gap-2">
              <button id="logout" class="btn btn-danger" type="submit" form="op.logoutForm" value="yes" name="logout">Confirm</button>
              <button class="btn btn-outline-light" type="submit" form="op.logoutForm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}
const protocol = ["integration", "development"].includes(
  process.env.APP_ENV ?? "development"
)
  ? "http"
  : "https";
const port = process.env.CLIENT_PORT ?? "8080";
const issuer = `${protocol}://${process.env.AUTH_URL}:${port}/oidc`;
const callbackRoot =
  process.env.CALLBACK_ROOT_URL ?? `http://localhost:${port}/callback`;
const uaskTest = {
  client_id: "uask-test",
  response_types: ["id_token"],
  grant_types: ["implicit"],
  redirect_uris: [callbackRoot],
  token_endpoint_auth_method: "none",
  post_logout_redirect_uris: [`${callbackRoot}-logout`],
};
const uask = {
  client_id: "uask",
  response_types: ["code"],
  grant_types: ["authorization_code"],
  redirect_uris: [callbackRoot, `${callbackRoot}-renew`],
  token_endpoint_auth_method: "none",
  post_logout_redirect_uris: [`${callbackRoot}-logout`],
};
const uaskClient = {
  client_id: "uask-client",
  client_secret: "RKO2SFw6rdv1FfHbbm",
  response_types: ["code"],
  grant_types: ["authorization_code"],
  redirect_uris: ["http://127.0.0.1:5505/callback"],
  token_endpoint_auth_method: "none",
};
const features = {
  encryption: { enabled: true },
  introspection: { enabled: true },
  revocation: { enabled: true },
  devInteractions: { enabled: false },
  rpInitiatedLogout: {
    logoutSource,
  },
};
const interactions = {
  url: interactionUrl,
};
const claims = {
  openid: ["sub"],
  email: ["email", "email_verified"],
  profile: [
    "given_name",
    "surname",
    "title",
    "phone",
    "surveys",
    "userid",
    "id",
    "extra_infos"
  ],
};
const jwks = process.env.AUTH_JWKS;
const options = {
  clients:
    process.env.APP_ENV == "development"
      ? [uask, uaskClient, uaskTest]
      : [uask, uaskClient],
  cookies: {
    keys: ["8A'.+2n)Z{VK`A~g", "7<k6;:mb}N/4Kc~%", "S4BrFLX%+/f__G^a"],
  },
  jwks: JSON.parse(jwks ?? "{}"),
  pkce: {
    required: true,
  },
  features,
  claims,
  interactions,
  loadExistingGrant,
  ttl: {
    AccessToken: 1800,
    Session: 1800,
    IdToken: 1800,
    Interaction: 1800,
    Grant: 604800,
  },
};
async function logoutSource(ctx, form) {
  ctx.body = logout(form);
}
async function loadExistingGrant(ctx) {
  const grant = new ctx.oidc.provider.Grant({
    clientId: ctx.oidc.client.clientId,
    accountId: ctx.oidc.session.accountId,
  });
  grant.addOIDCScope("openid email profile");
  await grant.save();
  return grant;
}
function provider(adapter, findAccount) {
  const provider = new Provider(issuer, { ...options, findAccount, adapter });
  provider.proxy = true;
  if (protocol == "http") {
    enableDevProtocol(provider);
  }
  return provider;
}
function enableDevProtocol(provider) {
  const { invalidate: orig } = provider.Client.Schema.prototype;
  provider.Client.Schema.prototype.invalidate = function invalidate(
    message,
    code
  ) {
    if (
      code === "implicit-force-https" ||
      code === "implicit-forbid-localhost"
    ) {
      return;
    }
    orig.call(this, message);
  };
}
function interactionUrl(ctx, interaction) {
  return `/oidc/interaction/${interaction.uid}?method=${
    ctx.query.method ?? "password"
  }${ctx.query.userid ? `&userid=${ctx.query.userid}` : ""}${
    ctx.query.magic ? `&magic=${ctx.query.magic}` : ""
  }${ctx.query.userid ? `&name=${ctx.query.name}` : ""}${
    ctx.query.surname ? `&surname=${ctx.query.surname}` : ""
  }${ctx.query.organization ? `&organization=${ctx.query.organization}` : ""}${ctx.query.role ? `&role=${ctx.query.role}` : ""}${ctx.query.phone ? `&phone=${ctx.query.phone}` : ""}`;
}
function renderLogin(req, res, data, flash) {
  const userid = getUserId(req);
  const hint = userid ? { login_hint: userid } : undefined;
  const params = data(hint);
  const method = getMethod(req);
  let nonce = crypto.randomBytes(16).toString("base64");
  const template = loginTemplate(method, nonce);
  const html = ejs.render(template, {
    ...params,
    title: "Welcome!",
    subtitle: "Catch your data easily.",
    saasMode: process.env.SAAS_MODE != "false",
    flash,
  });
  res.send(html, 200, {
    "content-type": "text/html; charset=utf-8",
    "content-security-policy": `script-src 'nonce-${nonce}'`,
  });
}
function renderConsent(req, res, data) {
  const params = data();
  const template = consentTemplate();
  const html = ejs.render(template, {
    ...params,
    title: "Consent",
  });
  res.send(html, 200, { "content-type": "text/html; charset=utf-8" });
}
function redirectToLogin(req, res, data, reason) {
  const flash = reason ?? whyLoginFailed(req);
  return renderLogin(req, res, data, flash);
}
function redirectToCodeAuthentication(req, res) {
  const method = getCodeMethod(req);
  const userid = getUserId(req);
  const name = getUserName(req);
  const surname = getUserSurname(req);
  const organization = getUserOrganization(req);
  const role = getUserRole(req);
  const phone = getUserPhone(req);
  const location = interactionUrl({query: { userid, method, name, surname, organization, role, phone }}, {uid: req.params.uid});
  res.send("", 303, {
    Location: location,
  });
}
function askedForCode(req) {
  return "send-code" in req.query;
}
function notificationNeeded(req) {
  const method = getMethod(req);
  return method.startsWith("code") && !method.endsWith("retry");
}
function isMagic(req) {
  const method = getMethod(req);
  return method == "magic";
}
function getUserId(req) {
  const method = getMethod(req);
  return method == "password"
    ? req.body?.email
    : req.body?.userid ?? req.query.userid;
}
function getUserName(req) {
  return req.query?.name ?? req.body?.name;
}
function getUserSurname(req) {
  return req.query?.surname ?? req.body?.surname;
}
function getUserOrganization(req) {
  return req.query?.organization ?? req.body?.organization;
}
function getUserRole(req) {
  return req.query?.role ?? req.body?.role;
}
function getUserPhone(req) {
  return req.query?.phone ?? req.body?.phone;
}
function getPassword(req) {
  const { password, password2 } = req.body;
  return { password, password2 };
}
function getCodeMethod(req) {
  const method = getMethod(req);
  return method == "password" || method.startsWith("code,reset")
    ? "code,reset"
    : "code";
}
function askedForSignin(req) {
  return /\?.*sign-in/.test(req.originalUrl);
}
function getMethod(req) {
  return req.query.method ?? req.body.method ?? "password";
}
function whyLoginFailed(req) {
  const method = getMethod(req);
  return askedForSignin(req)
    ? method == "password"
      ? "Invalid email or password"
      : "Invalid code"
    : undefined;
}
function askedForSignUp(req) {
  return "sign-up" in req.query;
}
const dlog = debug("uask-auth:service");
function service(provider, accountManager, notify = console.log) {
  const service = restana().newRouter();
  service.use(setNoCache);
  service.use(setHost);
  registerInteractions(provider, notify, accountManager, service);
  service.use(provider.callback());
  return service;
}
function setNoCache(req, res, next) {
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Cache-Control", "no-cache, no-store");
  next();
}
const authUrl$1 =
  process.env.AUTH_URL ??
  `http://localhost:${process.env.AUTH_PORT ?? 3000}/oidc`;
function setHost(req, res, next) {
  const host = new URL(authUrl$1).host;
  req.headers.host = host;
  next();
}
function registerInteractions(provider, notify, accountManager, service) {
  const manager = new InteractionManager(provider, notify, accountManager);
  service.get("/interaction/:uid", (req, res, next) =>
    manager.interaction(req, res, next)
  );
  const parse = bodyParser.urlencoded({ extended: false });
  service.post("/interaction/:uid/confirm", parse, (req, res, next) =>
    manager.confirm(req, res, next)
  );
  service.post("/interaction/:uid/login", parse, (req, res, next) =>
    manager.login(req, res, next)
  );
  service.get("/interaction/:uid/abort", parse, (req, res, next) =>
    manager.abort(req, res, next)
  );
  service.interactionManager = manager;
}
class InteractionManager {
  constructor(provider, notify, accountManager) {
    this.accountManager = accountManager;
    this.provider = provider;
    this.notify = notify;
  }
  interaction(req, res, next) {
    return this.startInteraction(req, res).catch(e => next(e));
  }
  login(req, res, next) {
    return (askedForSignUp(req)
      ? this.changeForCodeRegistering(req, res)
      : askedForCode(req)
      ? this.changeForCodeAuthentication(req, res)
      : this.proceedWithAuthentication(req, res)
    ).catch(e => next(e));
  }
  async confirm(req, res) {
    const result = {
      consent: {},
    };
    return this.provider.interactionFinished(req, res, result, {
      mergeWithLastSubmission: true,
    });
  }
  abort(req, res, next) {
    const result = {
      error: "access_denied",
      error_description: "End-User aborted interaction",
    };
    const options = { mergeWithLastSubmission: false };
    return this.provider
      .interactionFinished(req, res, result, options)
      .catch(e => next(e));
  }
  async startInteraction(req, res) {
    dlog(`authentication started (${req.params.uid})`);
    const { name, data } = await this.getDetails(req, res);
    if (name == "consent") renderConsent(req, res, data);
    else if (isMagic(req)) await this.loginMagic(req, res);
    else {
      await this.sendCodeIfNecessary(req);
      renderLogin(req, res, data);
    }
  }
  async loginMagic(req, res) {
    const accountId = await this.accountManager.authenticate(req.query);
    if (accountId) await this.loginCompleted(req, res, accountId);
    else await this.loginNotCompleted(req, res, "invalid connection link");
  }
  async changeForCodeAuthentication(req, res) {
    const userid = getUserId(req);
    const lowercased = String(userid).toLowerCase();
    const account = await this.accountManager.getByUserid(lowercased);
    if (account) {
      redirectToCodeAuthentication(req, res);
    } else {
      return this.loginNotCompleted(
        req,
        res,
        "No account associated with this email"
      );
    }
  }
  async proceedWithAuthentication(req, res) {
    await this.accountManager
      .authenticate({ ...req.body, ...req.query })
      .then(async accountId => {
        if (accountId) await this.authenticationSucceed(req, res, accountId);
        else await this.loginNotCompleted(req, res);
      });
  }
  async changeForCodeRegistering(req, res) {
    const userid = getUserId(req);
    const lowercased = String(userid).toLowerCase();
    const account = await this.accountManager.getByUserid(lowercased);
    if (account) {
      this.signupNotCompleted(
        req,
        res,
        "An account is already associated with this email"
      );
    } else {
      redirectToCodeAuthentication(req, res);
    }
  }
  async authenticationSucceed(req, res, accountId) {
    const { password, password2 } = getPassword(req);
    if (password2 && password != password2)
      await this.loginNotCompleted(req, res, "Passwords don't match");
    else {
      await this.changePasswordIfAsked(req, accountId);
      dlog(`authentication succeed (${req.params.uid})`);
      await this.loginCompleted(req, res, accountId);
    }
  }
  async changePasswordIfAsked(req, accountId) {
    const { password, password2 } = getPassword(req);
    if (password2) {
      const account = await this.accountManager.getById(accountId);
      await this.accountManager.save({ ...account, password });
    }
  }
  async loginCompleted(req, res, accountId) {
    const options = { mergeWithLastSubmission: false };
    const result = { login: { accountId } };
    await this.provider.interactionFinished(req, res, result, options);
  }
  async signupNotCompleted(req, res, reason) {
    dlog(`signup request failed (${req.params.uid}): ${reason}`);
    const { data } = await this.getDetails(req, res);
    await redirectToLogin(req, res, data, reason);
  }
  async loginNotCompleted(req, res, reason) {
    dlog(`authentication failed (${req.params.uid}): ${reason}`);
    const { data } = await this.getDetails(req, res);
    await this.sendCodeIfNecessary(req);
    await redirectToLogin(req, res, data, reason);
  }
  async sendCodeIfNecessary(req) {
    if (notificationNeeded(req)) {
      await this.sendAuthenticationCode(req);
    }
  }
  async sendAuthenticationCode(req) {
    const userid = getUserId(req);
    const name = getUserName(req);
    const surname = getUserSurname(req);
    const organization = getUserOrganization(req);
    const role = getUserRole(req);
    const phone = getUserPhone(req);
    const code = await generateCode({ userid, name, surname, organization, role, phone });
    const lowercased = String(userid).toLowerCase();
    const account = await this.accountManager.getByUserid(lowercased);
    await this.notify(
      account ?? new Account(lowercased, {}, { email: lowercased }),
      { userid: lowercased, code }
    );
  }
  getData(details, client, params) {
    return {
      client,
      uid: details.uid,
      details: details.prompt.details,
      params: { ...details.params, ...params },
    };
  }
  async getDetails(req, res) {
    const details = await this.provider.interactionDetails(req, res);
    const client = await this.provider.Client.find(details.params.client_id);
    return {
      name: details.prompt.name,
      data: p => this.getData(details, client, p),
    };
  }
}
process.env.AUTH_URL ??
  `http://localhost:${process.env.AUTH_PORT ?? 3000}/oidc`;

function getAllAccountsForSurvey$1(surveyName, client) {
    const manager = new AccountManager(client);
    return manager.getBySurvey(surveyName);
}
function getAccountByUserId(userid, client) {
    const manager = new AccountManager(client);
    return manager.getByUserid(userid);
}
function saveAccount(account, client) {
    const manager = new AccountManager(client);
    return manager.save(account);
}

function getAllAccountsForSurvey(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.survey);
            const users = yield drivers.userDriver.getAll(survey);
            res.send(users);
        }), { req, res });
    });
}
function getAccountByIdForSurvey(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.survey);
            const user = yield drivers.userDriver.getByUserId(survey, req.params.userid);
            res.send(user);
        }), { req, res });
    });
}
function saveAccountOnSurvey(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            try {
                const survey = yield drivers.surveyDriver.getByName(req.params.survey);
                const user = Object.assign(Object.create(User.prototype), req.body);
                const result = yield drivers.userDriver.save(survey, user);
                res.send(result);
            }
            catch (e) {
                res.send({ errors: [e] }, 400);
            }
        }), { req, res });
    });
}
function adminRouter(driverFactory) {
    return restana()
        .newRouter()
        .get("/:survey/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getAllAccountsForSurvey(driverFactory, req, res);
    }))
        .get("/:survey/users/:userid", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getAccountByIdForSurvey(driverFactory, req, res);
    }))
        .post("/:survey/users/:userid", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield saveAccountOnSurvey(driverFactory, req, res);
    }));
}

class UserTruenorthDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield getAllAccountsForSurvey$1(survey.name, this.client);
            return accounts.map(a => {
                var _a, _b;
                return new User(a.surname, a.given_name, a.title, a.surveys[survey.name].role, a.email, a.phone, DomainCollection(...((_a = a.surveys[survey.name].samples) !== null && _a !== void 0 ? _a : [])), DomainCollection(...((_b = a.surveys[survey.name].participants) !== null && _b !== void 0 ? _b : [])), {
                    password: a.password,
                    id: a.id,
                    salt: a.salt,
                    email_verified: a.email_verified,
                    userid: a.userid,
                    extra_infos: a.extra_infos,
                });
            });
        });
    }
    getByUserId(survey, userid) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield getAccountByUserId(userid, this.client);
            if (account && survey.name in account.surveys) {
                return new User(account.surname, account.given_name, account.title, account.surveys[survey.name].role, account.email, account.phone, DomainCollection(...((_a = account.surveys[survey.name].samples) !== null && _a !== void 0 ? _a : [])), DomainCollection(...((_b = account.surveys[survey.name].participants) !== null && _b !== void 0 ? _b : [])), {
                    password: account.password,
                    id: account.id,
                    salt: account.salt,
                    email_verified: account.email_verfied,
                    userid: account.userid,
                    extra_infos: account.extra_infos,
                });
            }
            return undefined;
        });
    }
    save(survey, user) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const manager = new AccountManager(this.client);
            const account = yield manager.getByUserid(user.userid);
            const surveys = (_a = account === null || account === void 0 ? void 0 : account.surveys) !== null && _a !== void 0 ? _a : {};
            surveys[survey.name] = {
                samples: ((_b = user.sampleCodes) !== null && _b !== void 0 ? _b : []),
                role: user.workflow,
                participants: [...((_c = user.participantCodes) !== null && _c !== void 0 ? _c : [])],
            };
            const userid = ((_e = (_d = user.userid) !== null && _d !== void 0 ? _d : user.email) !== null && _e !== void 0 ? _e : user.phone);
            const update = new Account(userid, surveys, {
                surname: user.name,
                given_name: user.firstName,
                phone: user.phone,
                password: user.password,
                id: user.id,
                email: user.email,
                email_verified: user.email_verified,
                title: user.title,
                salt: user.salt,
                userid: user.userid,
                extra_infos: user.extra_infos,
            });
            yield saveAccount(update, this.client);
            return user.update({ magic: update.magic });
        });
    }
}

class UserManagedDriver {
    constructor(driver, client) {
        this.driver = driver;
        this.client = client;
    }
    getAll(survey) {
        return this.driver.getAll(survey);
    }
    getByUserId(survey, userid) {
        return this.driver.getByUserId(survey, userid);
    }
    save(survey, user) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const a = (yield getAccountByUserId(((_b = (_a = user.userid) !== null && _a !== void 0 ? _a : user.email) !== null && _b !== void 0 ? _b : user.phone), this.client));
            const updatedUser = a && !user.id
                ? user.update({
                    name: a.surname,
                    firstName: a.given_name,
                    title: a.title,
                    email: ((_c = user.email) !== null && _c !== void 0 ? _c : a.email),
                    phone: ((_d = user.phone) !== null && _d !== void 0 ? _d : a.phone),
                    password: a.password,
                    id: a.id,
                    salt: a.salt,
                    email_verified: a.email_verified,
                    userid: a.userid,
                    extra_infos: a.extra_infos,
                })
                : user;
            return this.driver.save(survey, updatedUser);
        });
    }
}

class AuditRecord {
    constructor(target, sampleCode, date, operation, changes, user) {
        this.target = target;
        this.sampleCode = sampleCode;
        this.date = date;
        this.operation = operation;
        this.changes = changes;
        this.user = user;
    }
    getOperationIndex() {
        var _a;
        return AuditRecord.operationOrder.indexOf(((_a = this.changes.action) !== null && _a !== void 0 ? _a : getTranslation(this.operation, "en")));
    }
    isAfter(other) {
        const thisTime = Math.trunc(this.date.getTime() / 1000);
        const otherTime = Math.trunc(other.date.getTime() / 1000);
        return thisTime != otherTime
            ? thisTime > otherTime
            : this.getOperationIndex() > other.getOperationIndex();
    }
}
AuditRecord.operationOrder = ["create", "update"];

class AuditDbDriver {
    constructor(client) {
        this.client = client;
    }
    get(survey, target, operations) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const where = Object.assign({
                "audit_participants.surveyId": (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                participantCode: target.participantCode,
            }, target.nonce !== undefined ? { nonce: target.nonce } : {}, target.variableName !== undefined
                ? { variableName: target.variableName }
                : {}, target.instance !== undefined
                ? {
                    "audit_participants.instance": target.instance,
                    "interviewItems.instance": target.instance,
                }
                : {});
            const result = yield this.client
                .table("audit_participants")
                .innerJoin("participants", "participants.id", "audit_participants.participantId")
                .innerJoin("samples", "samples.id", "participants.sampleId")
                .leftOuterJoin("interviews", "interviews.id", "audit_participants.interviewId")
                .leftOuterJoin("interviewItems", function () {
                this.on("interviewItems.interviewId", "audit_participants.interviewId").andOn("interviewItems.pageItemId", "audit_participants.pageItemId");
            })
                .leftOuterJoin("pageItems", "pageItems.id", "audit_participants.pageItemId")
                .where(function () {
                if (operations) {
                    return this.where(where).whereIn("operation", operations.map(o => JSON.stringify(o)));
                }
                return this.where(where);
            })
                .select([
                "audit_participants.*",
                "sampleCode",
                "participantCode",
                "nonce",
                "variableName",
            ])
                .orderBy("audit_participants.id");
            return result.map(r => {
                return new AuditRecord(Object.assign(Object.assign(Object.assign({ participantCode: r.participantCode }, (r.nonce ? { nonce: r.nonce } : {})), (r.variableName ? { variableName: r.variableName } : {})), (r.instance ? { instance: r.instance } : {})), r.sampleCode, r.date, JSON.parse(r.operation), JSON.parse(r.payload), r.userId);
            });
        });
    }
}

function makeChangeRecord(row) {
    if (hasKeys(row)) {
        return makeRecord(changePayload(row), "update");
    }
    return makeRecord(createPayload(row), "create");
}
function makeRecord(payload, operation) {
    return payload ? { payload, operation } : {};
}
function changePayload(row) {
    if (!hasChanges(row))
        return undefined;
    return Object.keys(row.__changes__).reduce((payload, c) => {
        const key = c;
        if (inPayload(row, key)) {
            return payloadAssign(payload, key, row[key]);
        }
        return payload;
    }, undefined);
}
function createPayload(row) {
    return Object.keys(row).reduce((payload, t) => {
        const c = t;
        if (inPayload(row, c)) {
            return payloadAssign(payload, c, row[c]);
        }
        return payload;
    }, {});
}
function inPayload(row, c) {
    return (!(row[c] instanceof DomainCollectionImpl) &&
        c != "__changes__" &&
        c != "__keys__" &&
        c != "__untrack__" &&
        !(typeof row[c] == "object" && "update" in row[c]));
}
function payloadAssign(payload, c, value) {
    const p = {
        [c]: value instanceof Date && value ? value.toISOString() : value,
    };
    return Object.assign(p, payload);
}
function getChangeRecord(item) {
    const { payload, operation } = makeChangeRecord(item);
    if (typeof payload == "undefined")
        return { operation: "none" };
    const previous = hasChanges(item) ? item.update(item.__changes__) : undefined;
    const _a = item.diff(previous), { operation: oper } = _a, payl = __rest(_a, ["operation"]);
    return {
        payload: Object.assign(payload, payl),
        operation: oper !== null && oper !== void 0 ? oper : operation,
    };
}

class InterviewAuditDriver {
    constructor(driver, client, userId) {
        this.driver = driver;
        this.client = client;
        this.userId = userId;
    }
    save(survey, participant, interview, items = interview.items, options = new InterviewSaveOptions()) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const row = this.interviewRecord(survey, participant, interview, date);
            const itemRows = this.childRecords(survey, participant, items, date);
            const keys = yield this.driver.save(survey, participant, interview, items, options);
            const rows = row
                .concat(...itemRows)
                .map(r => { var _a; return (Object.assign(Object.assign({}, r), { interviewId: (_a = keys[0].__keys__) === null || _a === void 0 ? void 0 : _a.id })); });
            if (rows.length)
                yield this.client.table("audit_participants").insert(rows);
            return keys;
        });
    }
    interviewRecord(survey, participant, interview, date) {
        var _a, _b;
        const { payload, operation } = getChangeRecord(interview);
        return payload
            ? [
                {
                    surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                    participantId: (_b = participant.__keys__) === null || _b === void 0 ? void 0 : _b.id,
                    interviewId: undefined,
                    pageItemId: undefined,
                    payload: JSON.stringify(payload, (k, v) => k == "options" ? undefined : v),
                    operation: JSON.stringify(operation),
                    date,
                    userId: this.userId,
                },
            ]
            : [];
    }
    childRecords(survey, participant, items, date) {
        const changes = items
            .map(i => {
            var _a, _b, _c;
            return Object.assign({ pageItemId: (_b = (_a = i.pageItem) === null || _a === void 0 ? void 0 : _a.__keys__) === null || _b === void 0 ? void 0 : _b.id, instance: (_c = i.pageItem) === null || _c === void 0 ? void 0 : _c.instance }, getChangeRecord(i));
        })
            .filter(i => i.operation != "none");
        return changes.map(c => this.buildRecord(survey, participant, c, date));
    }
    buildRecord(survey, participant, c, date) {
        var _a, _b;
        return {
            surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
            participantId: (_b = participant.__keys__) === null || _b === void 0 ? void 0 : _b.id,
            interviewId: undefined,
            pageItemId: c.pageItemId,
            payload: JSON.stringify(c.payload, (key, value) => typeof value == "undefined" ? null : value),
            operation: JSON.stringify(c.operation),
            date,
            userId: this.userId,
            instance: c.instance,
        };
    }
    delete(survey, participant, interview) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof interview.__delete__ == "undefined")
                throw "interview suppression needs a justification";
            yield this.driver.delete(survey, participant, interview);
            const row = {
                surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                participantId: (_b = participant.__keys__) === null || _b === void 0 ? void 0 : _b.id,
                interviewId: undefined,
                pageItemId: undefined,
                payload: JSON.stringify({
                    type: interview.pageSet.type,
                    __delete__: interview.__delete__,
                }),
                operation: JSON.stringify("delete"),
                date: new Date(),
                userId: this.userId,
            };
            yield this.client.table("audit_participants").insert([row]);
        });
    }
}

class ParticipantAuditDriver {
    constructor(driver, client, userId) {
        this.driver = driver;
        this.client = client;
        this.userId = userId;
    }
    getAll(survey, samples, options = {}) {
        return this.driver.getAll(survey, samples, options);
    }
    getByParticipantCode(survey, samples, participantCode) {
        return this.driver.getByParticipantCode(survey, samples, participantCode);
    }
    getBySample(survey, sample, options = {}) {
        return this.driver.getBySample(survey, sample, options);
    }
    save(survey, participant) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.driver.save(survey, participant);
            const payload = makeChangeRecord(participant);
            if (payload) {
                const date = new Date();
                const row = {
                    surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                    participantId: (_b = keys.__keys__) === null || _b === void 0 ? void 0 : _b.id,
                    payload: JSON.stringify(payload),
                    operation: JSON.stringify(((_c = participant.__keys__) === null || _c === void 0 ? void 0 : _c.id) ? "update" : "create"),
                    date,
                    userId: this.userId,
                };
                yield this.client.table("audit_participants").insert(row);
            }
            return keys;
        });
    }
    delete(survey, participant) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof participant.__delete__ == "undefined")
                throw "Participant suppression needs a justification";
            yield this.driver.delete(survey, participant);
            const row = {
                surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                participantId: (_b = participant.__keys__) === null || _b === void 0 ? void 0 : _b.id,
                interviewId: undefined,
                pageItemId: undefined,
                payload: JSON.stringify({ __delete__: participant.__delete__ }),
                operation: JSON.stringify("delete"),
                date: new Date(),
                userId: this.userId,
            };
            yield this.client.table("audit_participants").insert([row]);
        });
    }
}

class ParticipantGetOptions {
    constructor() {
        this.offset = 0;
        this.limit = Infinity;
        this.deleted = false;
    }
}
class ParticipantMixinDriver {
    constructor(driver, deleteDriver) {
        this.driver = driver;
        this.deleteDriver = deleteDriver;
    }
    getAll(survey, samples, options) {
        return this.driver.getAll(survey, samples, options);
    }
    getByParticipantCode(survey, samples, participantCode) {
        return this.driver.getByParticipantCode(survey, samples, participantCode);
    }
    getBySample(survey, sample, options) {
        return this.driver.getBySample(survey, sample, options);
    }
    save(survey, participant) {
        return this.driver.save(survey, participant);
    }
    delete(survey, participant) {
        return this.deleteDriver.delete(survey, participant);
    }
}

class ParticipantSummary {
    constructor(survey, x, workflow) {
        this.survey = survey;
        Object.defineProperty(this, "survey", { enumerable: false });
        if (x instanceof Participant) {
            this.participantCode = x.participantCode;
            this.sampleCode = x.sample.sampleCode;
            const interview = x.currentInterview(workflow);
            this.currentInterview = this.interviewSummary(x, interview);
            this.interviewCount = x.interviews.length;
            this.pins = this.itemMap(x.currentItems(survey.pins).filter((i) => !!i));
            this.kpis = this.kpiMap(x.interviews.flatMap(i => i.kpis), survey.options);
            this.alerts = x.alerts
                .filter(a => a.item ? a.interview.pageSet.getPagesForItem(a.item).length > 0 : true)
                .map(a => {
                var _a;
                return ({
                    message: a.message,
                    interview: this.interviewSummary(x, a.interview),
                    page: this.pageSummary(a.interview, (_a = a.item) !== null && _a !== void 0 ? _a : a.page),
                    item: a.item ? this.itemSummary(a.item) : undefined,
                    type: a.type,
                    tags: a.tags,
                });
            });
            this.included = x.included;
            this.inclusionDate = x.inclusionDate;
        }
        else {
            this.participantCode = x.participantCode;
            this.sampleCode = x.sampleCode;
            this.currentInterview = this.currentInterview;
            this.interviewCount = x.interviewCount;
            this.pins = x.pins;
            this.kpis = x.kpis;
            this.alerts = DomainCollection(...x.alerts);
            this.inclusionDate = new Date(x.inclusionDate);
            this.included = x.included;
        }
        Object.freeze(this);
    }
    interviewSummary(participant, interview) {
        if (!interview)
            return {};
        return {
            type: interview.pageSet.type,
            status: interview.status,
            date: interview.date,
            index: participant.interviews.indexOf(interview) + 1,
            fillRate: interview.fillRate,
        };
    }
    itemMap(items) {
        return items.reduce((r, i) => {
            const _a = this.itemSummary(i), { variableName } = _a, item = __rest(_a, ["variableName"]);
            return Object.assign(Object.assign({}, r), { [variableName]: item });
        }, {});
    }
    kpiMap(kpis, options) {
        return kpis.reduce((r, i) => this.isPivotKpi(i) ? this.pivotKpi(r, options, i) : this.kpi(r, i), {});
    }
    isPivotKpi(i) {
        return Array.isArray(i) && hasFixedLabels(i[1].type);
    }
    kpi(r, i) {
        i = i instanceof InterviewItem ? i : i[0];
        const _a = this.itemSummary(i), { variableName } = _a, item = __rest(_a, ["variableName"]);
        return Object.assign(Object.assign({}, r), { [variableName]: item });
    }
    pivotKpi(r, options, i) {
        const [kpi, pivot] = i;
        const _a = this.itemSummary(kpi), { variableName } = _a, item = __rest(_a, ["variableName"]);
        const pivotVariable = pivot.pageItem.variableName;
        const pivotValue = pivot.value;
        return Object.assign(Object.assign({}, r), { [condStatVariable(variableName, pivotVariable, pivotValue)]: Object.assign(Object.assign({}, item), { kpi: condStatTitle(kpi.pageItem.kpi, options, pivotValue) }) });
    }
    pageSummary(interview, x) {
        const page = x instanceof Page ? x : interview.pageSet.getPagesForItem(x)[0];
        const px = interview.pageSet.pages.indexOf(page);
        return {
            name: page.name,
            index: px + 1,
        };
    }
    itemSummary(item) {
        const pageItem = getItem(item);
        return {
            wording: getItemWording(item),
            variableName: pageItem.variableName,
            type: pick(getItemType(item)),
            value: item instanceof InterviewItem ? item.value : undefined,
            specialValue: item instanceof InterviewItem ? item.specialValue : undefined,
            pin: pageItem.pin,
            kpi: pageItem.kpi,
        };
    }
}
function condStatVariable(variableName, pivotVarName, pivotValue) {
    return `${variableName}|${pivotVarName}=${pivotValue}`;
}
function condStatTitle(kpi, options, condValue) {
    var _a;
    const title = isML(kpi.title)
        ? kpi.title
        : { [(_a = options.defaultLang) !== null && _a !== void 0 ? _a : "en"]: kpi.title };
    return Object.entries(title).reduce((r, [lang, title]) => {
        const label = isMLstring(condValue) && isML(condValue)
            ? getTranslation(condValue, lang)
            : kpi.pivot.type.label(condValue, lang);
        return Object.assign(Object.assign({}, r), { [lang]: buildTitle(title, kpi, label !== null && label !== void 0 ? label : String(condValue)) });
    }, {});
}
function buildTitle(title, kpi, label) {
    if (title.includes("${value}"))
        return title.replace("${value}", String(label));
    return `${title}|${kpi.pivot.variableName}=${label}`;
}

class KpiGenericDriver {
    constructor(sampleDriver, summaryDriver) {
        this.sampleDriver = sampleDriver;
        this.summaryDriver = summaryDriver;
    }
    getAll(survey, samples) {
        return __awaiter(this, void 0, void 0, function* () {
            const summaries = yield this.getAllSummaries(survey, samples);
            if (typeof samples == "undefined")
                samples = yield this.sampleDriver.getAll(survey);
            const inclusionsBySamples = new InclusionsBySamples(survey, DomainCollection(...samples), DomainCollection(...summaries));
            const kpiSet = new KPISet(survey, summaries, { sample: true });
            const itemStats = this.getKpis(survey).map(k => kpiSet.variableNames.includes(k.variableName)
                ? kpiSet.getMatrix("@SAMPLE", k.variableName)
                : getKPIForUnknownConditional(survey, kpiSet, "@SAMPLE", k.variableName));
            return [[inclusionsBySamples, ...itemStats], kpiSet];
        });
    }
    getKpis(survey) {
        const allKpis = survey.kpis.flatMap(item => this.isPivotKpi(item)
            ? this.getPivotKpis(survey, item)
            : [item]);
        return [...allKpis].sort((a, b) => this.compateKpi(a, b));
    }
    compateKpi(a, b) {
        const [variableName1, condValue1] = a.variableName.split("|");
        const [variableName2, condValue2] = b.variableName.split("|");
        if (!condValue1 && !condValue2)
            return variableName1.localeCompare(variableName2);
        if (condValue1 && condValue2)
            return condValue1.localeCompare(condValue2);
        if (condValue1)
            return condValue1.localeCompare(variableName2);
        if (condValue2)
            return variableName1.localeCompare(condValue2);
        return 0;
    }
    isPivotKpi(item) {
        return hasPivot(item.kpi) && hasFixedLabels(item.kpi.pivot.type);
    }
    getPivotKpis(survey, item) {
        const pivotKpi = item.kpi;
        const pivotType = pivotKpi.pivot.type;
        return pivotType.labels.map(l => {
            const pivotValue = getTranslation(l, "__code__", survey.options.defaultLang);
            return {
                variableName: condStatVariable(item.variableName, pivotKpi.pivot.variableName, pivotValue),
                type: item.type,
                kpi: condStatTitle(pivotKpi, survey.options, l),
            };
        });
    }
    getAllSummaries(survey, samples) {
        if (typeof samples == "undefined")
            return this.getSummaries(survey);
        return Promise.all(samples.map(s => this.getSummaries(survey, s))).then(summaries => Array.prototype.concat([], ...summaries));
    }
    getSummaries(survey, sample) {
        return this.summaryDriver.getAll(survey, sample, [
            "participantCode",
            "sampleCode",
            "currentInterview",
            "interviewCount",
            "pins",
            "alerts",
            "included",
            "kpis",
            "inclusionDate",
        ]);
    }
}
function getKPIForUnknownConditional(survey, kpiSet, rowVariable, colVariable) {
    var _a;
    const [mainVariable, condition] = colVariable.split("|");
    const [conditionalVariable, conditionalValue] = condition.split("=");
    if (mainVariable == colVariable)
        throw `unknown variable ${colVariable}`;
    const v = kpiSet.variableNames.find(v => v.startsWith(`${mainVariable}|${conditionalVariable}`));
    const m = kpiSet.getMatrix(rowVariable, v);
    return Object.assign(Object.create(Object.getPrototypeOf(m)), {
        columnSums: [m.columnSums[0].map(() => NaN)],
        rowSums: m.rowSums.map(() => [NaN]),
        datasource: Object.assign(Object.assign({}, m.datasource), { column: Object.assign(Object.assign({}, m.datasource.column), { variableName: colVariable }) }),
        title: condStatTitle((_a = survey.getItemForVariable(mainVariable)) === null || _a === void 0 ? void 0 : _a.kpi, survey.options, conditionalValue),
        values: m.values.map(r => r.map(() => NaN)),
    });
}

class Document {
    constructor(name, title, tags, kwargs) {
        this.name = name;
        this.title = title;
        this.tags = tags;
        this.__keys__ = {};
        this.hash = 0;
        this.content = new Uint8Array();
        this.visibility = "survey";
        Object.assign(this, kwargs);
        Object.freeze(this);
    }
    update(kwargs) {
        const { __keys__ } = kwargs, others = __rest(kwargs, ["__keys__"]);
        if (Object.keys(others).length == 0) {
            Object.assign(this.__keys__, __keys__);
            return this;
        }
        return new Document(this.name, this.title, this.tags, Object.assign(Object.assign({}, this), kwargs));
    }
}

class SummaryDbDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey, sample, x, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const select = Array.isArray(x) ? x : [];
            options = Array.isArray(x) ? options : x;
            const rows = yield this.getRows(survey, sample, select, options);
            return rows.map(s => {
                const { currentInterview, pins, kpis, alerts } = s, summary = __rest(s, ["currentInterview", "pins", "kpis", "alerts"]);
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, summary), (currentInterview
                    ? { currentInterview: parseInterview(currentInterview) }
                    : {})), (pins ? { pins: JSON.parse(pins) } : {})), (kpis ? { kpis: JSON.parse(kpis) } : {})), (alerts ? { alerts: JSON.parse(alerts) } : {}));
            });
        });
    }
    getRows(survey, sample, select, options = {}) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const opt = Object.assign(Object.assign({}, new ParticipantGetOptions()), options);
            let table = this.client
                .table("summaries")
                .where("surveyId", (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id);
            table = opt.offset !== 0 ? table.offset(opt.offset) : table;
            table = opt.limit !== Infinity ? table.limit(opt.limit) : table;
            const projection = sample
                ? Array.isArray(sample)
                    ? table.whereIn("sampleId", sample.map(s => { var _a; return (_a = s.__keys__) === null || _a === void 0 ? void 0 : _a.id; }))
                    : table.where("sampleId", (_b = sample.__keys__) === null || _b === void 0 ? void 0 : _b.id)
                : table;
            return yield projection
                .select(select.length == 0 ? "*" : select)
                .orderBy("participantCode");
        });
    }
    getOutOfSync() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("summaries")
                .innerJoin("surveys", "summaries.surveyId", "surveys.id")
                .where("summaries.syncVersion", "!=", this.client.raw("surveys.version"))
                .orWhereNull("summaries.syncVersion")
                .select("surveys.name", "summaries.participantCode");
            return rows.reduce((a, r) => (Object.assign(Object.assign({}, a), { [r.name]: a[r.name]
                    ? [...a[r.name], r.participantCode]
                    : [r.participantCode] })), {});
        });
    }
}
function parseInterview(str) {
    const interview = JSON.parse(str);
    if (interview.date)
        interview.date = new Date(interview.date);
    return interview;
}

class ParticipantSummaryDriver {
    constructor(driver, client) {
        this.driver = driver;
        this.client = client;
    }
    getAll(survey, samples, options = {}) {
        return this.driver.getAll(survey, samples, options);
    }
    getByParticipantCode(survey, samples, participantCode) {
        return this.driver.getByParticipantCode(survey, samples, participantCode);
    }
    getBySample(survey, sample, options = {}) {
        return this.driver.getBySample(survey, sample, options);
    }
    save(survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.driver.save(survey, participant);
            yield this.saveSummary(this.client, survey, participant, keys);
            return keys;
        });
    }
    saveSummary(client, survey, participant, keys) {
        var _a, _b, _c, _d;
        const _e = new ParticipantSummary(survey, participant, survey.mainWorkflow), { currentInterview, pins, kpis, alerts } = _e, summary = __rest(_e, ["currentInterview", "pins", "kpis", "alerts"]);
        const completedInterviewCount = participant.interviews.filter(i => i.status == "fulfilled").length;
        return client
            .table("summaries")
            .insert(Object.assign(Object.assign({}, summary), { inclusionDate: participant.inclusionDate, currentInterview: JSON.stringify(currentInterview), pins: JSON.stringify(pins), kpis: JSON.stringify(kpis), alerts: JSON.stringify(alerts), completedInterviewCount, participantId: (_a = keys.__keys__) === null || _a === void 0 ? void 0 : _a.id, sampleId: (_b = participant.sample.__keys__) === null || _b === void 0 ? void 0 : _b.id, surveyId: (_c = survey.__keys__) === null || _c === void 0 ? void 0 : _c.id, syncVersion: (_d = survey.__keys__) === null || _d === void 0 ? void 0 : _d.version }))
            .onConflict("participantId")
            .merge();
    }
    delete(survey, participant) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.driver.delete(survey, participant);
            yield this.client
                .table("summaries")
                .where("participantId", (_a = participant.__keys__) === null || _a === void 0 ? void 0 : _a.id)
                .delete();
        });
    }
}

class SurveyStoreDriver {
    constructor(store) {
        this.store = store;
    }
    getByName(name) {
        return this.store.getSurveyNode(name).then(row => createSurvey(row));
    }
    save(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.store.saveSurvey(survey);
            yield this.store.savePages(survey);
            yield this.store.savePageItems(survey);
            yield this.store.savePageSets(survey);
            yield this.store.saveIncludes(survey);
            yield this.store.saveRules(survey);
            yield this.store.saveWorkflows(survey);
            return keys;
        });
    }
}
function createSurvey(node) {
    const builder = new SurveyBuilder();
    surveyDeserialize(builder, node);
    return builder.build();
}

class SampleStoreDriver {
    constructor(store) {
        this.store = store;
    }
    getAll(survey) {
        return this.store
            .getSampleNodes(survey.__keys__, "survey")
            .then(rows => rows.map(row => createSample(row)));
    }
    getBySampleCode(survey, sampleCode) {
        return this.store
            .getSampleNodes(survey.__keys__, "sampleCode", sampleCode)
            .then(row => createSample(row[0]));
    }
    save(survey, sample) {
        return this.store.saveSample(survey, sample);
    }
}
function createSample(node) {
    const { sampleCode } = node, other = __rest(node, ["sampleCode"]);
    return new Sample(sampleCode, Object.assign({}, other));
}

class ParticipantStoreDriver {
    constructor(store) {
        this.store = store;
    }
    getAll(survey, samples, options = {}) {
        return this.store
            .getParticipantNodes("survey", survey.__keys__, undefined, options)
            .then(rows => rows.map(row => createParticipant(survey, samples, row)));
    }
    getByParticipantCode(survey, samples, participantCode) {
        return this.store
            .getParticipantNodes("participantCode", survey.__keys__, participantCode, {})
            .then(row => createParticipant(survey, samples, row[0]));
    }
    getBySample(survey, sample, options = {}) {
        return this.store
            .getParticipantNodes("sample", survey.__keys__, sample.__keys__, options)
            .then(rows => rows.map(row => createParticipant(survey, [sample], row)));
    }
    save(survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            const participantCode = participant.participantCode
                ? participant.participantCode
                : yield this.newParticipantCode(survey, participant.sample);
            return this.store
                .saveParticipant(survey, participant.update({ participantCode }))
                .then(k => (Object.assign(Object.assign({}, k), { participantCode })));
        });
    }
    delete(survey, participant) {
        return this.store.participantStore.delete(survey, participant);
    }
    newParticipantCode(survey, sample) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = Object.assign(Object.assign({}, new SurveyOptions().participantCodeStrategy), survey.options.participantCodeStrategy);
            const knownCodes = yield this.store.client
                .table("participants")
                .where(Object.assign({ surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id }, ((strategy === null || strategy === void 0 ? void 0 : strategy.bySample) ? { sampleId: (_b = sample.__keys__) === null || _b === void 0 ? void 0 : _b.id } : {})))
                .select("participantCode")
                .then(r => r.map(s => s.participantCode));
            const prefix = (strategy === null || strategy === void 0 ? void 0 : strategy.bySample) ? sample.sampleCode : "";
            return computeNewCode(prefix, knownCodes, strategy);
        });
    }
}
function computeNewCode(prefix, codes, strategy) {
    if (!codes.length)
        return prefix + "000001";
    const current = getCurrentCode(codes.map(c => formatCode({ participantCode: c }, { participantCodeStrategy: strategy })));
    return prefix + `000000${current + 1}`.slice(-6);
}
function getCurrentCode(codes) {
    return codes.reduce((current, code) => {
        const n = Number(code);
        return n > current ? n : current;
    }, 0);
}
function createParticipant(survey, samples, node) {
    const pb = new ParticipantBuilder(survey, DomainCollection(...samples));
    participantDeserialize(pb, node);
    return pb.build();
}

class InterviewStoreDriver {
    constructor(store) {
        this.store = store;
    }
    save(survey, participant, interview, items = interview.items) {
        return __awaiter(this, void 0, void 0, function* () {
            const nonce = interview.nonce != 0 ? interview.nonce : yield newNonce();
            const position = participant.interviews.findIndex(i => i == interview || (i.nonce > 0 && i.nonce == interview.nonce));
            const interviewKeys = yield this.store.saveInterview(survey, participant, interview.update({ nonce }), position == -1 ? participant.interviews.length : position);
            const updated = Object.assign({}, interview, { nonce }, interviewKeys);
            const itemKeys = yield this.store.saveInterviewItems(survey, updated, items);
            return [
                Object.assign({ nonce }, interviewKeys),
                {
                    items: itemKeys,
                },
            ];
        });
    }
    delete(survey, participant, interview) {
        return this.store.interviewStore.delete(survey, participant, interview);
    }
}
function newNonce() {
    return Promise.resolve(Math.ceil(Math.random() * 1e16));
}

function upsert(driver, row, keys = ["id"]) {
    const k = Object.entries(row).reduce((result, [k, v]) => (keys.includes(k) ? Object.assign(Object.assign({}, result), { [k]: v }) : result), {});
    return driver.table
        .insert(row)
        .onConflict(keys)
        .merge()
        .returning(keys)
        .then(result => {
        var _a;
        const [r] = result;
        const rid = typeof r == "object" && "id" in r ? r.id : r;
        const id = "id" in row ? (_a = row.id) !== null && _a !== void 0 ? _a : rid : undefined;
        return {
            __keys__: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, k), (id ? { id } : {})), (row.version ? { version: row.version } : {})), (row.surveyId ? { surveyId: row.surveyId } : {})), (row.participantId ? { participantId: row.participantId } : {})),
            __untrack__: true,
        };
    })
        .catch(err => {
        return Promise.reject(new UaskError(err));
    });
}
function upsertChilds(driver, childRows, keys) {
    return __awaiter(this, void 0, void 0, function* () {
        if (childRows.length > 0)
            yield driver.childTable
                .insert(childRows)
                .onConflict(keys)
                .merge()
                .catch(err => {
                return Promise.reject(new UaskError(err));
            });
    });
}

class SurveyDriver {
    constructor(client) {
        this.client = client;
    }
    get table() {
        return this.client.table("surveys");
    }
    save(survey) {
        var _a, _b, _c;
        const options = JSON.stringify(survey.options);
        const row = {
            id: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
            version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
            name: survey.name,
            options,
        };
        return upsert(this, row, ["id"]);
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.client.table("surveys").where("name", name).first();
            if (row == undefined)
                return Promise.reject(new UaskError({ code: "NOT_FOUND", message: "unknown survey" }));
            return Object.assign(row, {
                __keys__: { id: row.id, version: row.version },
            });
        });
    }
}

class SampleDriver {
    constructor(client) {
        this.client = client;
    }
    get table() {
        return this.client.table("samples");
    }
    save(survey, sample) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.eagerSupport = undefined;
            if (!survey.__keys__)
                throw "missing survey key";
            const surveyId = survey.__keys__.id;
            const row = {
                id: (_a = sample.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                sampleCode: sample.sampleCode,
                name: sample.name,
                address: sample.address,
                frozen: sample.frozen,
                surveyId,
            };
            return yield upsert(this, row, ["id"]);
        });
    }
    getRowById(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.eagerSupport == undefined ||
                this.eagerSupport.surveyId != key.surveyId) {
                this.eagerSupport = new EagerSupport$5(key.surveyId, this.client);
            }
            const row = (yield this.eagerSupport.get(key.id));
            return Object.assign(row, { __keys__: { id: row.id } });
        });
    }
    getRowsBySurvey(surveyKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("samples")
                .where("surveyId", surveyKey.id)
                .orderBy("samples.sampleCode");
            return rows.map(r => Object.assign(r, { __keys__: { id: r.id, surveyId: r.surveyId } }));
        });
    }
    getAll(survey) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("samples")
                .where("surveyId", (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id)
                .orderBy("samples.sampleCode");
            return rows.map(r => Object.assign(r, { __keys__: { id: r.id, surveyId: r.surveyId } }));
        });
    }
    getRowBySampleCode(surveyKeys, sampleCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.client
                .table("samples")
                .where("sampleCode", sampleCode)
                .where("surveyId", surveyKeys.id)
                .first();
            return Object.assign(row, {
                __keys__: { id: row.id, surveyId: row.surveyId },
            });
        });
    }
}
class EagerSupport$5 {
    constructor(surveyId, client) {
        this.surveyId = surveyId;
        this.rows = client
            .table("samples")
            .where("surveyId", surveyId)
            .then(result => new Map(result.map(r => [r.id, r])));
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.rows).get(id);
        });
    }
}

class InterviewDriver {
    constructor(client) {
        this.client = client;
    }
    get table() {
        return this.client.table("interviews");
    }
    save(survey, participant, interview, position) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const row = {
                id: (_a = interview.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                pageSetId: (_b = interview.pageSet.__keys__) === null || _b === void 0 ? void 0 : _b.id,
                surveyId: (_c = survey.__keys__) === null || _c === void 0 ? void 0 : _c.id,
                participantId: (_d = participant.__keys__) === null || _d === void 0 ? void 0 : _d.id,
                nonce: interview.nonce,
                lastInput: interview.lastInput,
                position,
            };
            return upsert(this, row, ["id"]);
        });
    }
    delete(surveyKeys, interviewKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .table("interviews")
                .whereIn("id", interviewKeys.map(k => k.id))
                .delete();
        });
    }
    getRowByParticipant(surveyKeys, participantKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("interviews")
                .where("participantId", participantKey.id)
                .innerJoin("surveys", "interviews.surveyId", "surveys.id")
                .innerJoin("pageSets", "interviews.pageSetId", "pageSets.id")
                .where("pageSets.version", ">=", surveyKeys.version)
                .select("interviews.*", "surveys.options", "pageSets.type")
                .orderBy("interviews.position");
            return rows.map(r => Object.assign(r, {
                pageSetType: JSON.parse(r.type),
                __keys__: { id: r.id, surveyId: r.surveyId, participantId: r.participantId },
            }));
        });
    }
}

function valueOrThrow(message = "value is undefined") {
    return t => {
        if (!t)
            throw message;
        return t;
    };
}

class ItemTypeDriver {
    constructor(client) {
        this.client = client;
        this.rows = this.client
            .table("itemTypes")
            .then(r => r)
            .catch(() => []);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows
                .then(rr => rr.find(r => r.id == id))
                .then(valueOrThrow("type not found"));
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows
                .then(rr => rr.find(r => r.name == name))
                .then(valueOrThrow("type not found"));
        });
    }
}

class PageItemDriver {
    constructor(client) {
        this.client = client;
    }
    get table() {
        return this.client.table("pageItems");
    }
    static initGlobalItems(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.globalInitializer == "undefined") {
                const driver = new PageItemDriver(client);
                this.globalInitializer = driver.getGlobals();
            }
            yield this.globalInitializer;
        });
    }
    getGlobals() {
        return this.client
            .table("pageItems")
            .whereNull("surveyId")
            .select("id", "variableName")
            .then(def => this.mergeGlobals(def));
    }
    mergeGlobals(def) {
        return Promise.all(new GlobalScope({ lastInput: new Date(), sample: new Sample("") }).items
            .map(i => i.pageItem)
            .map(i => this.mergeGlobal(i, def)));
    }
    mergeGlobal(pageItem, result) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = result.find(r => r.variableName == pageItem.variableName);
            if (entry) {
                pageItem.update({ __keys__: { id: entry.id }, __untrack__: true });
            }
            else {
                const keyInfo = yield this.save({ __keys__: {} }, Object.assign(Object.assign({}, pageItem), { __keys__: {} }));
                pageItem.update(keyInfo);
            }
            return pageItem;
        });
    }
    save(survey, pageItem) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this.eagerSupport = undefined;
            const _e = pageItem.type, { name } = _e, typeArgs = __rest(_e, ["name"]);
            const type = yield new ItemTypeDriver(this.client).getByName(name);
            const row = {
                id: (_a = pageItem.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
                surveyId: (_d = survey.__keys__) === null || _d === void 0 ? void 0 : _d.id,
                wording: JSON.stringify(pageItem.wording),
                variableName: pageItem.variableName,
                typeId: type.id,
                typeArgs: JSON.stringify(typeArgs),
                units: JSON.stringify(pageItem.units),
                comment: JSON.stringify(pageItem.comment),
                section: JSON.stringify(pageItem.section),
                pin: JSON.stringify(pageItem.pin),
                kpi: JSON.stringify(hasPivot(pageItem.kpi)
                    ? {
                        title: pageItem.kpi.title,
                        pivot: pageItem.kpi.pivot.variableName,
                    }
                    : pageItem.kpi),
                array: pageItem.array,
            };
            return upsert(this, row, ["id"]);
        });
    }
    getRowById(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.eagerSupport == undefined ||
                this.eagerSupport.surveyId != key.surveyId) {
                this.eagerSupport = new EagerSupport$4(key.surveyId, this.client);
            }
            const row = (yield this.eagerSupport.get(key.id));
            return Object.assign(row, {
                __keys__: { id: row.id, version: row.version, surveyId: row.surveyId },
            });
        });
    }
}
class EagerSupport$4 {
    constructor(surveyId, client) {
        this.surveyId = surveyId;
        this.rows = client
            .table("pageItems")
            .where("surveyId", surveyId)
            .then(result => new Map(result.map(r => [r.id, r])));
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.rows).get(id);
        });
    }
}

class PageSetDriver {
    constructor(client) {
        this.client = client;
    }
    save(survey, pageSet, position) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const row = {
                id: (_a = pageSet.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
                type: JSON.stringify(pageSet.type),
                surveyId: (_d = survey.__keys__) === null || _d === void 0 ? void 0 : _d.id,
                datevar: JSON.stringify(pageSet.datevar),
                position,
            };
            const keyInfo = yield upsert(this, row, ["id"]);
            const childRows = [
                ...pageSet.pages.map((p, i) => {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
                        surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                        version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
                        pageSetId: (_d = keyInfo.__keys__) === null || _d === void 0 ? void 0 : _d.id,
                        pageId: (_e = p.__keys__) === null || _e === void 0 ? void 0 : _e.id,
                        mandatory: !!((_f = pageSet.mandatoryPages) === null || _f === void 0 ? void 0 : _f.some(m => { var _a, _b; return ((_a = m.__keys__) === null || _a === void 0 ? void 0 : _a.id) == ((_b = p.__keys__) === null || _b === void 0 ? void 0 : _b.id); })),
                        position: i,
                    });
                }),
            ];
            yield upsertChilds(this, childRows, ["surveyId", "pageSetId", "pageId"]);
            return keyInfo;
        });
    }
    get childTable() {
        return this.client.table("pageSetPages");
    }
    get table() {
        return this.client.table("pageSets");
    }
    getRowBySurvey(surveyKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("pageSets")
                .where("surveyId", surveyKey.id)
                .orderBy("position");
            return this.mapRows(rows);
        });
    }
    getRowByWorkflow(workflowKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("workflowPageSets")
                .where("workflowId", workflowKey.id)
                .innerJoin("pageSets", "workflowPageSets.pageSetId", "pageSets.id")
                .where("workflowPageSets.version", this.client.ref("pageSets.version"))
                .orderBy("workflowPageSets.position");
            return this.mapRows(rows);
        });
    }
    mapRows(rows) {
        return rows.map(r => Object.assign(r, {
            __keys__: { id: r.id, version: r.version, surveyId: r.surveyId },
        }));
    }
}

class ParticipantDriver {
    constructor(client) {
        this.client = client;
    }
    save(survey, participant) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const row = {
                id: (_a = participant.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                sampleId: (_b = participant.sample.__keys__) === null || _b === void 0 ? void 0 : _b.id,
                surveyId: (_c = survey.__keys__) === null || _c === void 0 ? void 0 : _c.id,
                participantCode: participant.participantCode,
            };
            return yield upsert(this, row, ["id"]);
        });
    }
    delete(surveyKeys, participantKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.table.where("id", participantKeys.id).update("__deleted__", true);
        });
    }
    get table() {
        return this.client.table("participants");
    }
    getRowBySurvey(surveyKey, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.table
                .where("surveyId", surveyKey.id)
                .where("__deleted__", false)
                .orderBy("participantCode");
            return yield this.fetchRows(query, options);
        });
    }
    getRowsBySample(surveyKey, key, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.client
                .table("participants")
                .where("surveyId", surveyKey.id)
                .where("sampleId", key.id)
                .where("__deleted__", false)
                .orderBy("participantCode");
            return yield this.fetchRows(query, options);
        });
    }
    fetchRows(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const opt = Object.assign(Object.assign({}, new ParticipantGetOptions()), options);
            query = opt.offset !== 0 ? query.offset(opt.offset) : query;
            query = opt.limit !== Infinity ? query.limit(opt.limit) : query;
            const rows = yield query;
            return rows.map((r) => Object.assign(r, { __keys__: { id: r.id, surveyId: r.surveyId } }));
        });
    }
    getRowByCode(surveyKey, participantCode, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = this.client
                .table("participants")
                .where("surveyId", surveyKey.id)
                .where("participantCode", participantCode);
            const rowDel = options.deleted ? row : row.where("__deleted__", false);
            const rowFirst = yield rowDel.first();
            return rowFirst
                ? Object.assign(rowFirst, {
                    __keys__: { id: rowFirst.id, surveyId: rowFirst.surveyId },
                })
                : {};
        });
    }
}

class InterviewItemDriver {
    constructor(client) {
        this.client = client;
    }
    get table() {
        return this.client.table("interviewItems");
    }
    save(survey, interview, interviewItem, position) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this.eagerSupport = undefined;
            const row = {
                pageItemId: (_a = interviewItem.pageItem.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                surveyId: (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.id,
                participantId: (_c = interview.__keys__) === null || _c === void 0 ? void 0 : _c.participantId,
                interviewId: (_d = interview.__keys__) === null || _d === void 0 ? void 0 : _d.id,
                instance: interviewItem.pageItem.instance || 1,
                value: JSON.stringify(interviewItem.value),
                context: JSON.stringify(interviewItem.context),
                unit: interviewItem.unit,
                specialValue: interviewItem.specialValue,
                messages: JSON.stringify(interviewItem.messages),
                position,
            };
            return upsert(this, row, ["interviewId", "pageItemId", "instance"]);
        });
    }
    delete(surveyKeys, interviewKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .table("interviewItems")
                .whereIn("interviewId", interviewKeys.map(k => k.id))
                .delete();
        });
    }
    getRowsByInterview(surveyKeys, interviewKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.eagerSupport == undefined ||
                this.eagerSupport.participantId != interviewKey.participantId) {
                this.eagerSupport = new EagerSupport$3(interviewKey.participantId, surveyKeys.version, this.client);
            }
            const rows = (yield this.eagerSupport.get(interviewKey.id));
            return rows.map(r => Object.assign(r, {
                __keys__: {
                    interviewId: r.interviewId,
                    pageItemId: r.pageItemId,
                    instance: r.instance,
                    surveyId: r.surveyId,
                    participantId: r.participantId,
                },
            }));
        });
    }
}
class EagerSupport$3 {
    constructor(participantId, version, client) {
        this.participantId = participantId;
        const query = client
            .table("interviewItems")
            .where("interviewItems.participantId", participantId)
            .join("pageItems", "interviewItems.pageItemId", "pageItems.id")
            .where("pageItems.version", ">=", version)
            .whereExists(function () {
            this.table("interviews")
                .innerJoin("pageSetPages", "interviews.pageSetId", "pageSetPages.pageSetId")
                .innerJoin("includes", "pageSetPages.pageId", "includes.pageId")
                .where("includes.version", ">=", version)
                .whereRaw('interviews.id = "interviewItems"."interviewId"')
                .whereRaw('includes."pageItemId" = "pageItems".id')
                .select(1);
        })
            .select("interviewItems.*", "pageItems.variableName")
            .orderBy(["interviewItems.position", "interviewItems.instance"]);
        this.rows = query.then(r => {
            const acc = new Map();
            return r.reduce((acc, i) => {
                const group = acc.get(i.interviewId);
                if (group)
                    group.push(i);
                else
                    acc.set(i.interviewId, [i]);
                return acc;
            }, acc);
        });
    }
    get(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield this.rows).get(id)) !== null && _a !== void 0 ? _a : [];
        });
    }
}

class PageDriver {
    constructor(client) {
        this.client = client;
    }
    get table() {
        return this.client.table("pages");
    }
    save(survey, page, position) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this.eagerSupport = undefined;
            const row = {
                id: (_a = page.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
                name: JSON.stringify(page.name),
                surveyId: (_d = survey.__keys__) === null || _d === void 0 ? void 0 : _d.id,
                exportConfig: page.exportConfig
                    ? JSON.stringify(page.exportConfig)
                    : undefined,
                position,
            };
            return upsert(this, row, ["id"]);
        });
    }
    getRowByPageSet(pageSetKey, mandatoryOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("pageSetPages")
                .where("pageSetId", pageSetKey.id)
                .innerJoin("pages", "pageSetPages.pageId", "pages.id")
                .where("pageSetPages.version", this.client.ref("pages.version"))
                .orderBy("pageSetPages.position");
            return this.mapRows(rows, mandatoryOnly);
        });
    }
    getRowBySurvey(surveyKey, mandatoryOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            const support = this.loadSupport({ surveyId: surveyKey.id });
            const rows = (yield support.getAll());
            return this.mapRows(rows, mandatoryOnly);
        });
    }
    mapRows(rows, mandatoryOnly) {
        return rows
            .filter(r => (mandatoryOnly ? r.mandatory : r))
            .map(r => Object.assign(r, {
            __keys__: { id: r.id, version: r.version, surveyId: r.surveyId },
        }));
    }
    getRowById(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const support = this.loadSupport(key);
            const row = (yield support.get(key.id));
            return Object.assign(row, {
                __keys__: { id: row.id, version: row.version, surveyId: row.surveyId },
            });
        });
    }
    loadSupport(key) {
        if (this.eagerSupport == undefined ||
            this.eagerSupport.surveyId != key.surveyId) {
            this.eagerSupport = new EagerSupport$2(key.surveyId, this.client);
        }
        return this.eagerSupport;
    }
}
class EagerSupport$2 {
    constructor(surveyId, client) {
        this.surveyId = surveyId;
        this.rows = client
            .table("pages")
            .where("surveyId", surveyId)
            .orderBy("position")
            .then(r => [...r]);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.rows).find(r => r.id == id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.rows;
        });
    }
}

function isLibraryRow(o) {
    return "pageItemIds" in o;
}
class IncludeDriver {
    constructor(client) {
        this.client = client;
    }
    get childTable() {
        return this.client.table("includes");
    }
    save(survey, page, include, pos) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            this.eagerSupport = undefined;
            if (include instanceof PageItem) {
                const row = {
                    surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                    version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
                    pageId: (_d = page.__keys__) === null || _d === void 0 ? void 0 : _d.id,
                    pageItemId: (_e = include.__keys__) === null || _e === void 0 ? void 0 : _e.id,
                    includedPageId: (_f = page.__keys__) === null || _f === void 0 ? void 0 : _f.id,
                    position: pos * 10000,
                };
                yield upsertChilds(this, [row], ["surveyId", "pageId", "includedPageId", "pageItemId"]);
            }
            else {
                const library = include.items.map((item, x) => {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
                        surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                        version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
                        pageId: (_d = page.__keys__) === null || _d === void 0 ? void 0 : _d.id,
                        pageItemId: (_e = getItem(item).__keys__) === null || _e === void 0 ? void 0 : _e.id,
                        includedPageId: (_f = include.page.__keys__) === null || _f === void 0 ? void 0 : _f.id,
                        position: pos * 10000 + x,
                        context: getItemContext(item)
                            ? JSON.stringify(getItemContext(item))
                            : undefined,
                    });
                });
                yield upsertChilds(this, [...library], ["surveyId", "pageId", "includedPageId", "pageItemId"]);
            }
        });
    }
    getRowByPage(pageKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.eagerSupport == undefined ||
                this.eagerSupport.surveyId != pageKey.surveyId) {
                this.eagerSupport = new EagerSupport$1(pageKey.surveyId, this.client);
            }
            const rows = (yield this.eagerSupport.getByPageId(pageKey.id));
            return rows.map(r => Object.assign(r, r.pageId == r.includedPageId ? { includedPageId: undefined } : {}, { __keys__: { id: r.id, version: r.version, surveyId: r.surveyId } }));
        });
    }
}
class EagerSupport$1 {
    constructor(surveyId, client) {
        this.surveyId = surveyId;
        const q = client
            .table("includes")
            .join("pageItems", "includes.pageItemId", "pageItems.id")
            .where("pageItems.surveyId", surveyId)
            .where("includes.version", client.ref("pageItems.version"))
            .select("includes.*", "pageItems.variableName")
            .orderBy("position");
        this.rows = q.then(r => [...r]);
    }
    getByPageId(pageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.rows).filter(r => r.pageId == pageId);
        });
    }
}

class RuleTypeDriver {
    constructor(client) {
        this.client = client;
        this.rows = this.client.table("ruleTypes").then(r => r);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows;
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows
                .then(rr => rr.find(r => r.name == name))
                .then(valueOrThrow("rule not found"));
        });
    }
    getById(id) {
        return this.rows
            .then(rr => rr.find(r => r.id == id))
            .then(valueOrThrow("rule not found"));
    }
}

class ScopeDriver {
    constructor(client) {
        this.client = client;
        this.rows = this.client
            .table("scopes")
            .then(rr => rr)
            .catch(() => []);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows;
        });
    }
    getByLevel(level) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows
                .then(rr => rr.find(r => r.level == level))
                .then(valueOrThrow("scope not found"));
        });
    }
    getById(id) {
        return this.rows
            .then(rr => rr.find(r => r.id == id))
            .then(valueOrThrow("scope not found"));
    }
    get(c) {
        return this.client
            .table("scopes")
            .where(c)
            .select("level", "id")
            .first()
            .then(valueOrThrow("scope not found"));
    }
}

class RuleDriver {
    constructor(client) {
        this.client = client;
    }
    save(survey, rule, position) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            this.eagerSupport = undefined;
            yield PageItemDriver.initGlobalItems(this.client);
            const ruleTypeDriver = new RuleTypeDriver(this.client);
            const ruleType = yield ruleTypeDriver.getByName(rule.name);
            const row = {
                hash: RuleDriver.h(survey, rule, ruleType),
                surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
                ruleTypeId: ruleType.id,
                args: JSON.stringify(rule.args),
                when: JSON.stringify(rule.when),
                itemCount: rule.pageItems.length,
                position: position,
            };
            const keyInfo = yield upsert(this, row, ["surveyId", "hash"]);
            const childRows = yield this.getChildRows(rule, survey, keyInfo);
            yield upsertChilds(this, childRows, [
                "surveyId",
                "pageItemId",
                "scopeId",
                "ruleHash",
            ]);
        });
    }
    getChildRows(rule, survey, keyInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(rule.pageItems.map((pi, i) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g;
                const pageItem = pi instanceof PageItem ? pi : pi[0];
                const scopeDriver = new ScopeDriver(this.client);
                const scopeId = pi instanceof PageItem
                    ? (_a = (yield scopeDriver.getByLevel("local"))) === null || _a === void 0 ? void 0 : _a.id
                    : (_b = (yield scopeDriver.getByLevel(pi[1]))) === null || _b === void 0 ? void 0 : _b.id;
                return {
                    surveyId: (_c = survey.__keys__) === null || _c === void 0 ? void 0 : _c.id,
                    version: (_e = (_d = survey.__keys__) === null || _d === void 0 ? void 0 : _d.version) !== null && _e !== void 0 ? _e : 1,
                    pageItemId: (_f = pageItem.__keys__) === null || _f === void 0 ? void 0 : _f.id,
                    scopeId,
                    ruleHash: (_g = keyInfo.__keys__) === null || _g === void 0 ? void 0 : _g.hash,
                    position: i,
                };
            })));
        });
    }
    get childTable() {
        return this.client.table("rulePageItems");
    }
    get table() {
        return this.client.table("rules");
    }
    loadSupport(key) {
        if (this.eagerSupport == undefined ||
            this.eagerSupport.surveyId != key.surveyId ||
            this.eagerSupport.version != key.version) {
            this.eagerSupport = new EagerSupport(key.surveyId, key.version, this.client);
        }
        return this.eagerSupport;
    }
    getRowById(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const support = this.loadSupport(key);
            return (yield support.getByHash(key.hash));
        });
    }
    getUnitRuleRowByPageItem(pageItemKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const support = this.loadSupport(pageItemKey);
            return (yield support.getByPageItemId(pageItemKey.id));
        });
    }
    getCrossRuleRowBySurvey(surveyKey) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PageItemDriver.initGlobalItems(this.client);
            return yield this.client
                .table("rulePageItems")
                .innerJoin("rules", joinRules)
                .join("pageItems", "rulePageItems.pageItemId", "pageItems.id")
                .where("rules.surveyId", surveyKey.id)
                .where("itemCount", ">", 1)
                .where("rules.version", surveyKey.version)
                .where("rulePageItems.version", surveyKey.version)
                .select("rulePageItems.*", "rules.hash", "rules.position as rulePosition", "pageItems.variableName")
                .orderBy(["rules.position", "rulePageItems.position"]);
        });
    }
    static h(survey, rule, ruleType) {
        var _a, _b;
        return fnv([(_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id, (_b = rule.target.__keys__) === null || _b === void 0 ? void 0 : _b.id, ruleType.id].join(","));
    }
}
function joinRules() {
    this.on("rulePageItems.surveyId", "rules.surveyId").on("rulePageItems.ruleHash", "rules.hash");
}
class EagerSupport {
    constructor(surveyId, version, client) {
        this.surveyId = surveyId;
        this.version = version;
        const q = client
            .table("rulePageItems")
            .where("rulePageItems.surveyId", surveyId)
            .where("rulePageItems.position", 0)
            .innerJoin("rules", joinRules)
            .where("rules.version", version)
            .where("rulePageItems.version", version)
            .select("rules.*", "rulePageItems.pageItemId")
            .orderBy("rules.position");
        this.rows = q.then(r => [...r]);
    }
    getByHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.rows).find(r => r.hash == hash);
        });
    }
    getByPageItemId(pageItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.rows).filter(r => r.pageItemId == pageItemId && r.itemCount == 1);
        });
    }
}

class DocumentDriver {
    constructor(client) {
        this.client = client;
    }
    get table() {
        return this.client.table("documents");
    }
    save(survey, document) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!survey.__keys__)
                throw "missing survey key";
            const surveyId = survey.__keys__.id;
            const row = {
                name: document.name,
                hash: document.hash,
                title: JSON.stringify(document.title),
                tags: JSON.stringify(document.tags),
                content: document.content,
                visibility: document.visibility == "survey",
                surveyId,
            };
            const u = yield upsert(this, row, ["surveyId", "hash"]);
            const others = __rest(u, ["__untrack__"]);
            return others;
        });
    }
    getMetadataByHash(surveyKey, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.client
                .table("documents")
                .select("surveyId", "hash", "name", "title", "tags", "visibility")
                .where("surveyId", surveyKey.id)
                .where("hash", hash)
                .first();
            return Object.assign(row, {
                __keys__: { surveyId: row.surveyId, hash: row.hash },
            });
        });
    }
    getContentByHash(surveyKey, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client
                .table("documents")
                .select("content", "name")
                .where("surveyId", surveyKey.id)
                .where("hash", hash)
                .first();
        });
    }
    getAll(surveyKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("documents")
                .where("surveyId", surveyKey.id)
                .andWhere("visibility", true);
            return rows.map(row => Object.assign(row, {
                __keys__: { surveyId: row.surveyId, hash: row.hash },
            }));
        });
    }
    deleteByHash(surveyKey, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .table("documents")
                .where("surveyId", surveyKey.id)
                .where("hash", hash)
                .delete();
        });
    }
}

class WorkflowTypeDriver {
    constructor(client) {
        this.client = client;
        this.rows = this.client
            .table("workflowTypes")
            .then(rr => rr.map(r => (Object.assign(Object.assign({}, r), { type: JSON.parse(r.type) }))))
            .catch(() => []);
    }
    getAll() {
        return this.rows;
    }
    getByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows
                .then(rr => rr.find(r => r.type == type))
                .then(valueOrThrow("workflow type not found"));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rows
                .then(rr => rr.find(r => r.id == id))
                .then(valueOrThrow("workflow type not found"));
        });
    }
}

class WorkflowDriver {
    constructor(client) {
        this.client = client;
    }
    save(survey, workflow, position) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const row = {
                id: (_a = workflow.__keys__) === null || _a === void 0 ? void 0 : _a.id,
                version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
                name: workflow.name,
                notifications: JSON.stringify(workflow.notifications),
                position: position,
                surveyId: (_d = survey.__keys__) === null || _d === void 0 ? void 0 : _d.id,
            };
            const keyInfo = yield upsert(this, row, ["id"]);
            const workflowTypeDriver = new WorkflowTypeDriver(this.client);
            const infoType = yield workflowTypeDriver.getByType("info");
            const infoRow = workflow.info
                ? this.getChildRow(survey, workflow, keyInfo, workflow.info, infoType, 0)
                : undefined;
            const oneType = yield workflowTypeDriver.getByType("single");
            const oneRows = this.getChildRows(survey, workflow, keyInfo, workflow.single, oneType);
            const manyType = yield workflowTypeDriver.getByType("many");
            const manyRows = this.getChildRows(survey, workflow, keyInfo, workflow.many, manyType);
            const startsWithType = yield workflowTypeDriver.getByType("sequence");
            const startsWithRows = this.getChildRows(survey, workflow, keyInfo, workflow.sequence, startsWithType);
            const endsWithType = yield workflowTypeDriver.getByType("stop");
            const endsWithRows = this.getChildRows(survey, workflow, keyInfo, workflow.stop, endsWithType);
            yield upsertChilds(this, infoRow
                ? [infoRow, ...oneRows, ...manyRows, ...startsWithRows, ...endsWithRows]
                : [...oneRows, ...manyRows, ...startsWithRows, ...endsWithRows], ["surveyId", "pageSetId", "workflowId", "workflowTypeId"]);
            return keyInfo;
        });
    }
    getChildRows(survey, workflow, keyInfo, pageSets, type) {
        return pageSets.map((p, i) => this.getChildRow(survey, workflow, keyInfo, p, type, i));
    }
    getChildRow(survey, workflow, keyInfo, pageSet, type, i) {
        var _a, _b, _c, _d, _e;
        return {
            surveyId: (_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id,
            version: (_c = (_b = survey.__keys__) === null || _b === void 0 ? void 0 : _b.version) !== null && _c !== void 0 ? _c : 1,
            pageSetId: (_d = pageSet.__keys__) === null || _d === void 0 ? void 0 : _d.id,
            workflowId: (_e = keyInfo.__keys__) === null || _e === void 0 ? void 0 : _e.id,
            workflowTypeId: type.id,
            position: i,
        };
    }
    get childTable() {
        return this.client.table("workflowPageSets");
    }
    get table() {
        return this.client.table("workflows");
    }
    getRowsBySurvey(surveyKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.client
                .table("workflows")
                .where("surveyId", surveyKey.id)
                .orderBy("position");
            return rows.map(r => Object.assign(r, {
                __keys__: {
                    id: r.id,
                    version: r.version,
                    surveyId: r.surveyId,
                },
            }));
        });
    }
}

class WorkflowStore {
    constructor(drivers) {
        this.drivers = drivers;
    }
    saveAll(survey) {
        return Promise.all(survey.workflows.map((w, i) => __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.drivers.workflowDriver.save(survey, w, i);
            w.update(keys);
            return keys;
        })));
    }
    getNodes(options, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            return this.drivers.workflowDriver
                .getRowsBySurvey(keys)
                .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.workflowRowToNode(keys, options, r); }))));
        });
    }
    workflowRowToNode(surveyKeys, options, row) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const { __keys__, notifications } = row;
            if (!__keys__)
                throw "key missing in row";
            const pageSets = yield this.drivers.pageSetDriver
                .getRowByWorkflow(__keys__)
                .then(rows => rows.map(row => {
                const name = getTranslation(JSON.parse(row.type), "__code__", options.defaultLang);
                return Object.assign(Object.assign({}, row), { name });
            }));
            const typeToPageSets = yield Promise.all(pageSets.map((row) => __awaiter(this, void 0, void 0, function* () {
                const type = yield this.drivers.workflowTypeDriver
                    .getById(row.workflowTypeId)
                    .then(r => r.type);
                return Object.assign(Object.assign({}, row), { type });
            }))).then(rows => this.groupByWorkflowType(rows));
            const infoType = (_a = typeToPageSets.get("info")) === null || _a === void 0 ? void 0 : _a[0];
            return Object.assign(Object.assign({ __keys__, name: row.name }, (infoType ? { infoType } : {})), { singleTypes: (_b = typeToPageSets.get("single")) !== null && _b !== void 0 ? _b : [], manyTypes: (_c = typeToPageSets.get("many")) !== null && _c !== void 0 ? _c : [], sequenceTypes: (_d = typeToPageSets.get("sequence")) !== null && _d !== void 0 ? _d : [], stopTypes: (_e = typeToPageSets.get("stop")) !== null && _e !== void 0 ? _e : [], notifications: JSON.parse(notifications) });
        });
    }
    groupByWorkflowType(rows) {
        return __awaiter(this, void 0, void 0, function* () {
            return rows.reduce((result, r) => {
                let names = result.get(r.type);
                if (names == undefined) {
                    names = [r.name];
                    result.set(r.type, names);
                }
                else {
                    names.push(r.name);
                }
                return result;
            }, new Map());
        });
    }
}

class RuleStore {
    constructor(drivers) {
        this.drivers = drivers;
    }
    saveAll(survey) {
        return Promise.all(survey.rules.map((r, i) => __awaiter(this, void 0, void 0, function* () {
            return yield this.drivers.ruleDriver.save(survey, r, i);
        })));
    }
    getNodes(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            return this.drivers.ruleDriver
                .getUnitRuleRowByPageItem(keys)
                .then(rows => Promise.all(rows.map(r => this.ruleRowToNode(r))));
        });
    }
    getCrossNodes(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            return this.drivers.ruleDriver
                .getCrossRuleRowBySurvey(keys)
                .then(rows => this.groupByRule(rows))
                .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.crossRuleRowToNode(keys, r); }))));
        });
    }
    ruleRowToNode(row) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, precedence } = yield this.drivers.ruleTypeDriver.getById(row.ruleTypeId);
            return Object.assign({ name,
                precedence }, JSON.parse(row.args));
        });
    }
    crossRuleRowToNode(keys, row) {
        return __awaiter(this, void 0, void 0, function* () {
            const variableNames = yield Promise.all(row.variableNames.map((r, index) => __awaiter(this, void 0, void 0, function* () {
                const scope = yield this.drivers.scopeDriver.getById(row.scopeIds[index]);
                if (scope.level == "global")
                    return "@" + r;
                if (scope.level == "outer")
                    return "$" + r;
                return r;
            })));
            const rule = yield this.drivers.ruleDriver.getRowById({
                surveyId: row.surveyId,
                version: keys.version,
                hash: row.ruleHash,
            });
            const args = yield this.ruleRowToNode(rule).then(r => {
                const expected = __rest(r, ["precedence"]);
                return expected;
            });
            return {
                variableNames,
                args: args,
                when: JSON.parse(rule.when),
            };
        });
    }
    groupByRule(rows) {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                ...rows
                    .reduce((result, r) => {
                    let obj = result.get(r.ruleHash);
                    if (obj == undefined) {
                        obj = {
                            surveyId: r.surveyId,
                            pageItemIds: [r.pageItemId],
                            ruleHash: r.ruleHash,
                            scopeIds: [r.scopeId],
                            variableNames: [r.variableName],
                            rulePosition: r.rulePosition,
                        };
                        result.set(r.ruleHash, obj);
                    }
                    else {
                        obj.pageItemIds.push(r.pageItemId);
                        obj.scopeIds.push(r.scopeId);
                        obj.variableNames.push(r.variableName);
                    }
                    return result;
                }, new Map())
                    .values(),
            ].sort((r1, r2) => r1.rulePosition - r2.rulePosition);
        });
    }
}

class PageItemStore {
    constructor(drivers) {
        this.drivers = drivers;
        this.ruleStore = new RuleStore(this.drivers);
    }
    saveAll(survey) {
        return Promise.all(survey.items.map((pi) => __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.drivers.pageItemDriver.save(survey, pi);
            pi.update(keys);
            return keys;
        })));
    }
    getNode(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            return this.drivers.pageItemDriver
                .getRowById(keys)
                .then((r) => __awaiter(this, void 0, void 0, function* () { return this.pageItemRowToNode(r); }));
        });
    }
    pageItemRowToNode(row) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { typeId, typeArgs, wording, units, comment, section, pin, kpi, variableName, array, __keys__, } = row;
            const { name } = yield this.drivers.itemTypeDriver.getById(typeId);
            const type = ItemTypes.create(Object.assign({ name }, JSON.parse(typeArgs)));
            const allRules = yield this.ruleStore.getNodes(__keys__);
            const constantRule = allRules.find(r => r.name == "constant");
            const rules = allRules.filter(r => r != constantRule);
            const rawKpi = JSON.parse(kpi);
            return Object.assign({
                wording: JSON.parse(wording),
                variableName,
                units: JSON.parse(units),
                __keys__,
                type,
                rules,
                array,
            }, constantRule ? { default: constantRule.value } : {}, section ? { section: JSON.parse(section) } : {}, comment ? { itemComment: JSON.parse(comment) } : {}, pin ? { pinTitle: JSON.parse(pin) } : {}, kpi ? { kpiTitle: (_a = rawKpi.title) !== null && _a !== void 0 ? _a : rawKpi } : {}, kpi && !!rawKpi.pivot ? { kpiPivot: rawKpi.pivot } : {});
        });
    }
}

class IncludeStore {
    constructor(drivers) {
        this.drivers = drivers;
        this.pageItemStore = new PageItemStore(this.drivers);
    }
    saveAll(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(survey.pages.map(p => Promise.all(p.includes.map((i, x) => this.drivers.includeDriver.save(survey, p, i, x)))));
        });
    }
    getNodes(options, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            return this.drivers.includeDriver
                .getRowByPage(keys)
                .then(rows => this.groupByLibrary(rows))
                .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () {
                return isLibraryRow(r)
                    ? this.libraryRowToNode(options, r)
                    : this.includeRowToNode(options, r);
            }))));
        });
    }
    libraryRowToNode(options, row) {
        return __awaiter(this, void 0, void 0, function* () {
            const { includedPageId, surveyId, variableNames } = row;
            const pageName = yield this.drivers.pageDriver
                .getRowById({ id: includedPageId, surveyId })
                .then(r => getTranslation(JSON.parse(r.name), "__code__", options.defaultLang));
            const contexts = yield Promise.all(row.contexts
                .map(c => {
                const variableName = variableNames[c[0]];
                return [variableName, JSON.parse(c[1])];
            })
                .filter(c => c[1] != undefined));
            return {
                pageName,
                variableNames,
                contexts,
            };
        });
    }
    includeRowToNode(options, row) {
        return this.pageItemStore.getNode({
            id: row.pageItemId,
            surveyId: row.surveyId,
        });
    }
    groupByLibrary(rows) {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                ...rows
                    .reduce((result, r) => {
                    if (typeof r.includedPageId == "number") {
                        let obj = result.get(r.includedPageId);
                        if (obj == undefined) {
                            obj = {
                                surveyId: r.surveyId,
                                pageId: r.pageId,
                                includedPageId: r.includedPageId,
                                pageItemIds: [r.pageItemId],
                                contexts: [[0, r.context]],
                                position: r.position,
                                variableNames: [r.variableName],
                            };
                            result.set(r.includedPageId, obj);
                        }
                        else {
                            obj.pageItemIds.push(r.pageItemId);
                            obj.contexts.push([obj.pageItemIds.length - 1, r.context]);
                            obj.variableNames.push(r.variableName);
                        }
                    }
                    else {
                        result.set(-r.pageItemId, r);
                    }
                    return result;
                }, new Map())
                    .values(),
            ].sort((a, b) => a.position - b.position);
        });
    }
}

class PageStore {
    constructor(drivers) {
        this.drivers = drivers;
        this.includeStore = new IncludeStore(this.drivers);
    }
    saveAll(survey) {
        return Promise.all(survey.pages.map((p, index) => __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.drivers.pageDriver.save(survey, p, index);
            p.update(keys);
            return keys;
        })));
    }
    getNodes(by, options, keys, mandatoryOnly = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            switch (by) {
                case "pageSet":
                    return this.drivers.pageDriver
                        .getRowByPageSet(keys, mandatoryOnly)
                        .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.pageRowToNode(options, r); }))));
                case "survey":
                    return this.drivers.pageDriver
                        .getRowBySurvey(keys, mandatoryOnly)
                        .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.pageRowToNode(options, r); }))));
            }
        });
    }
    pageRowToNode(options, row) {
        return __awaiter(this, void 0, void 0, function* () {
            const { __keys__, name, exportConfig } = row;
            const includes = yield this.includeStore.getNodes(options, __keys__);
            return Object.assign({
                name: JSON.parse(name),
                __keys__,
                includes,
            }, exportConfig ? { exportConfig: JSON.parse(exportConfig) } : {});
        });
    }
}

class PageSetStore {
    constructor(drivers) {
        this.drivers = drivers;
        this.pageStore = new PageStore(this.drivers);
    }
    saveAll(survey) {
        return Promise.all(survey.pageSets.map((ps, index) => __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.drivers.pageSetDriver.save(survey, ps, index);
            ps.update(keys);
            return keys;
        })));
    }
    getNodes(options, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            return this.drivers.pageSetDriver
                .getRowBySurvey(keys)
                .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.pageSetRowToNode(options, r); }))));
        });
    }
    pageSetRowToNode(options, row) {
        return __awaiter(this, void 0, void 0, function* () {
            const { __keys__, type, datevar } = row;
            const samePage = (i) => getTranslation(i.name, "__code__", options.defaultLang);
            const pageNames = yield this.pageStore
                .getNodes("pageSet", options, __keys__)
                .then(nodes => nodes.map(samePage));
            const mandatoryPageNames = yield this.pageStore
                .getNodes("pageSet", options, __keys__, true)
                .then(nodes => nodes.map(samePage));
            return Object.assign({
                type: JSON.parse(type),
                __keys__,
                pageNames,
                mandatoryPageNames,
            }, datevar ? { datevar: JSON.parse(datevar) } : {});
        });
    }
}

class SurveyStore {
    constructor(drivers) {
        this.drivers = drivers;
        this.pageStore = new PageStore(this.drivers);
        this.pageSetStore = new PageSetStore(this.drivers);
        this.ruleStore = new RuleStore(this.drivers);
        this.workflowStore = new WorkflowStore(this.drivers);
    }
    save(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.drivers.surveyDriver.save(survey);
            survey.update(keys);
            return keys;
        });
    }
    getNode(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.drivers.surveyDriver
                .getByName(name)
                .then((row) => __awaiter(this, void 0, void 0, function* () { return this.surveyRowToNode(row); }));
        });
    }
    surveyRowToNode(row) {
        return __awaiter(this, void 0, void 0, function* () {
            const __keys__ = row.__keys__;
            const surveyOptions = JSON.parse(row.options);
            const workflows = yield this.workflowStore.getNodes(surveyOptions, __keys__);
            const pageSets = yield this.pageSetStore.getNodes(surveyOptions, __keys__);
            const pages = yield this.pageStore.getNodes("survey", surveyOptions, __keys__);
            const crossRules = yield this.ruleStore.getCrossNodes(__keys__);
            return {
                name: row.name,
                __keys__,
                config: surveyOptions,
                workflows,
                pageSets,
                pages,
                crossRules,
            };
        });
    }
}

class SampleStore {
    constructor(drivers) {
        this.drivers = drivers;
    }
    get save() {
        return this.drivers.sampleDriver.save.bind(this.drivers.sampleDriver);
    }
    saveAll(survey, samples) {
        return Promise.all(samples.map((sample) => __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.drivers.sampleDriver.save(survey, sample);
            sample.update(keys);
            return keys;
        })));
    }
    getNodes(surveyKeys, by, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (by != "survey" && !keys)
                throw "key missing in row";
            switch (by) {
                case "survey":
                    return this.drivers.sampleDriver
                        .getRowsBySurvey(surveyKeys)
                        .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.sampleRowToNode(r); }))));
                case "sampleId":
                    return this.drivers.sampleDriver
                        .getRowById(Object.assign({ surveyId: surveyKeys.id }, keys))
                        .then((row) => __awaiter(this, void 0, void 0, function* () { return this.sampleRowToNode(row); }))
                        .then(s => [s]);
                case "sampleCode":
                    return this.drivers.sampleDriver
                        .getRowBySampleCode(surveyKeys, keys)
                        .then((row) => __awaiter(this, void 0, void 0, function* () { return this.sampleRowToNode(row); }))
                        .then(s => [s]);
            }
        });
    }
    sampleRowToNode(row) {
        return __awaiter(this, void 0, void 0, function* () {
            const { __keys__, sampleCode, name, address, frozen } = row;
            return {
                sampleCode,
                name,
                address,
                frozen,
                __keys__,
            };
        });
    }
}

class InterviewItemStore {
    constructor(drivers) {
        this.drivers = drivers;
    }
    saveAll(survey, y, items) {
        if ("nonce" in y)
            return this.saveItems(survey, y, items);
        return this.saveParticipants(survey, y);
    }
    saveParticipants(survey, participants) {
        return Promise.all(participants.map(p => Promise.all(p.interviews.map(i => Promise.all(i.items.map((t, index) => __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.drivers.interviewItemDriver.save(survey, i, t, index);
            t.update(keys);
            return keys;
        }))))).then(k => [].concat(...k)))).then(k => [].concat(...k));
    }
    saveItems(survey, updated, items) {
        return Promise.all(items.map((i, x) => this.drivers.interviewItemDriver.save(survey, updated, i, x)));
    }
    getNodes(surveyKeys, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            return this.drivers.interviewItemDriver
                .getRowsByInterview(surveyKeys, keys)
                .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.interviewItemRowToNode(r); }))));
        });
    }
    interviewItemRowToNode(row) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { variableName, value, unit, specialValue, instance, context: contextJson, messages: messagesJson, __keys__, } = row;
            const messages = JSON.parse(messagesJson);
            const context = contextJson == "0" ? 0 : contextJson == "1" ? 1 : JSON.parse(contextJson);
            return {
                __keys__,
                variableName,
                instance: instance || 1,
                value: (_a = JSON.parse(value)) !== null && _a !== void 0 ? _a : undefined,
                unit: unit !== null && unit !== void 0 ? unit : undefined,
                specialValue: (_b = specialValue) !== null && _b !== void 0 ? _b : undefined,
                context,
                messages,
            };
        });
    }
}

class InterviewStore {
    constructor(drivers) {
        this.drivers = drivers;
        this.interviewItemStore = new InterviewItemStore(this.drivers);
    }
    get save() {
        return this.drivers.interviewDriver.save.bind(this.drivers.interviewDriver);
    }
    saveAll(survey, participants) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(participants.map((p) => __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < p.interviews.length; i++) {
                    const interview = p.interviews[i];
                    const keys = yield this.drivers.interviewDriver.save(survey, p, interview, i);
                    interview.update(keys);
                }
            })));
        });
    }
    delete(survey, participant, interview) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drivers.interviewItemDriver.delete(survey.__keys__, [
                interview.__keys__,
            ]);
            yield this.drivers.interviewDriver.delete(survey.__keys__, [
                interview.__keys__,
            ]);
        });
    }
    getNodes(surveyKeys, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!keys)
                throw "key missing in row";
            return this.drivers.interviewDriver
                .getRowByParticipant(surveyKeys, keys)
                .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.interviewRowToNode(surveyKeys, r); }))));
        });
    }
    interviewRowToNode(surveyKeys, row) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nonce, options, pageSetType, lastInput, __keys__ } = row;
            const config = JSON.parse(options);
            const items = yield this.interviewItemStore.getNodes(surveyKeys, __keys__);
            return {
                nonce,
                __keys__,
                pageSetType: getTranslation(pageSetType, "__code__", config.defaultLang),
                items,
                lastInput: new Date(lastInput).toISOString(),
            };
        });
    }
}

class ParticipantStore {
    constructor(drivers) {
        this.drivers = drivers;
        this.interviewStore = new InterviewStore(this.drivers);
        this.sampleStore = new SampleStore(this.drivers);
    }
    get save() {
        return this.drivers.participantDriver.save.bind(this.drivers.participantDriver);
    }
    delete(survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const interview of participant.interviews)
                yield this.interviewStore.delete(survey, participant, interview);
            yield this.drivers.participantDriver.delete(survey.__keys__, participant.__keys__);
        });
    }
    saveAll(survey, participants) {
        return Promise.all(participants.map((p) => __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.drivers.participantDriver.save(survey, p);
            p.update(keys);
            return keys;
        })));
    }
    getNodes(by, surveyKeys, keys, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapRows = (rows) => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.participantRowToNode(surveyKeys, r); })));
            switch (by) {
                case "survey":
                    return this.drivers.participantDriver
                        .getRowBySurvey(surveyKeys, options)
                        .then(mapRows);
                case "sample":
                    return this.drivers.participantDriver
                        .getRowsBySample(surveyKeys, keys, options)
                        .then(mapRows);
                case "participantCode":
                    return this.drivers.participantDriver
                        .getRowByCode(surveyKeys, keys)
                        .then((row) => __awaiter(this, void 0, void 0, function* () {
                        if (typeof row == "undefined")
                            return Promise.reject("participant not found");
                        return this.participantRowToNode(surveyKeys, row);
                    }))
                        .then(p => [p]);
            }
        });
    }
    participantRowToNode(surveyKeys, row) {
        return __awaiter(this, void 0, void 0, function* () {
            const { participantCode, __keys__ } = row;
            const sample = yield this.sampleStore
                .getNodes({ id: row.surveyId }, "sampleId", {
                id: row.sampleId,
            })
                .then(s => s[0]);
            const interviews = yield this.interviewStore.getNodes(surveyKeys, __keys__);
            return {
                participantCode,
                sample,
                interviews,
                __keys__,
            };
        });
    }
}

class DocumentStore {
    constructor(drivers) {
        this.drivers = drivers;
    }
    get save() {
        return this.drivers.documentDriver.save.bind(this.drivers.documentDriver);
    }
    get getContentByHash() {
        return this.drivers.documentDriver.getContentByHash.bind(this.drivers.documentDriver);
    }
    get deleteByHash() {
        return this.drivers.documentDriver.deleteByHash.bind(this.drivers.documentDriver);
    }
    saveAll(survey, documents) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(documents.map((document) => __awaiter(this, void 0, void 0, function* () {
                const keys = yield this.drivers.documentDriver.save(survey, document);
                document.update(keys);
                return keys;
            })));
        });
    }
    delete(hash, surveyKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!surveyKeys)
                throw "key missing in row";
            return this.drivers.documentDriver
                .deleteByHash(surveyKeys, hash)
                .catch(() => Promise.reject("document not found"));
        });
    }
    getNode(hash, surveyKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!surveyKeys)
                throw "key missing in row";
            return this.drivers.documentDriver
                .getMetadataByHash(surveyKeys, hash)
                .then((row) => __awaiter(this, void 0, void 0, function* () { return this.documentRowToNode(row); }))
                .catch(() => Promise.reject("document not found"));
        });
    }
    getNodes(surveyKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!surveyKeys)
                throw "key missing in row";
            return this.drivers.documentDriver
                .getAll(surveyKeys)
                .then(rows => Promise.all(rows.map((r) => __awaiter(this, void 0, void 0, function* () { return this.documentRowToNode(r); }))));
        });
    }
    documentRowToNode(row) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, title, tags, __keys__, hash, visibility } = row; __rest(row, ["name", "title", "tags", "__keys__", "hash", "visibility"]);
            return Object.assign({
                name,
                title: JSON.parse(title),
                __keys__: __keys__,
                hash,
                visibility: (visibility ? "survey" : "participant"),
            }, tags ? { tags: JSON.parse(tags) } : {});
        });
    }
}

class Drivers {
    constructor(client) {
        this.client = client;
        this.surveyDriver = new SurveyDriver(this.client);
        this.pageDriver = new PageDriver(this.client);
        this.pageItemDriver = new PageItemDriver(this.client);
        this.itemTypeDriver = new ItemTypeDriver(this.client);
        this.pageSetDriver = new PageSetDriver(this.client);
        this.includeDriver = new IncludeDriver(this.client);
        this.ruleDriver = new RuleDriver(this.client);
        this.ruleTypeDriver = new RuleTypeDriver(this.client);
        this.scopeDriver = new ScopeDriver(this.client);
        this.workflowDriver = new WorkflowDriver(this.client);
        this.workflowTypeDriver = new WorkflowTypeDriver(this.client);
        this.sampleDriver = new SampleDriver(this.client);
        this.participantDriver = new ParticipantDriver(this.client);
        this.interviewDriver = new InterviewDriver(this.client);
        this.interviewItemDriver = new InterviewItemDriver(this.client);
        this.documentDriver = new DocumentDriver(this.client);
    }
}
class Store extends Drivers {
    constructor(client) {
        super(client);
        this.client = client;
        this.surveyStore = new SurveyStore(this);
        this.pageSetStore = new PageSetStore(this);
        this.pageStore = new PageStore(this);
        this.pageItemStore = new PageItemStore(this);
        this.includeStore = new IncludeStore(this);
        this.ruleStore = new RuleStore(this);
        this.workflowStore = new WorkflowStore(this);
        this.sampleStore = new SampleStore(this);
        this.participantStore = new ParticipantStore(this);
        this.interviewStore = new InterviewStore(this);
        this.interviewItemStore = new InterviewItemStore(this);
        this.documentStore = new DocumentStore(this);
    }
    get saveSurvey() {
        return this.surveyStore.save.bind(this.surveyStore);
    }
    get getSurveyNode() {
        return this.surveyStore.getNode.bind(this.surveyStore);
    }
    get savePages() {
        return this.pageStore.saveAll.bind(this.pageStore);
    }
    get savePageItems() {
        return this.pageItemStore.saveAll.bind(this.pageItemStore);
    }
    get savePageSets() {
        return this.pageSetStore.saveAll.bind(this.pageSetStore);
    }
    get saveIncludes() {
        return this.includeStore.saveAll.bind(this.includeStore);
    }
    get saveRules() {
        return this.ruleStore.saveAll.bind(this.ruleStore);
    }
    get saveWorkflows() {
        return this.workflowStore.saveAll.bind(this.workflowStore);
    }
    get saveSamples() {
        return this.sampleStore.saveAll.bind(this.sampleStore);
    }
    get saveSample() {
        return this.sampleStore.save.bind(this.sampleStore);
    }
    get getSampleNodes() {
        return this.sampleStore.getNodes.bind(this.sampleStore);
    }
    get saveParticipants() {
        return this.participantStore.saveAll.bind(this.participantStore);
    }
    get saveParticipant() {
        return this.participantStore.save.bind(this.participantStore);
    }
    get getParticipantNodes() {
        return this.participantStore.getNodes.bind(this.participantStore);
    }
    get saveInterviews() {
        return this.interviewStore.saveAll.bind(this.interviewStore);
    }
    get saveInterview() {
        return this.interviewStore.save.bind(this.interviewStore);
    }
    get saveInterviewItems() {
        return this.interviewItemStore.saveAll.bind(this.interviewItemStore);
    }
    get saveDocuments() {
        return this.documentStore.saveAll.bind(this.documentStore);
    }
    get saveDocument() {
        return this.documentStore.save.bind(this.documentStore);
    }
    get deleteDocument() {
        return this.documentStore.delete.bind(this.documentStore);
    }
    get getDocumentNode() {
        return this.documentStore.getNode.bind(this.documentStore);
    }
    get getDocumentNodes() {
        return this.documentStore.getNodes.bind(this.documentStore);
    }
    get getDocumentContent() {
        return this.documentStore.getContentByHash.bind(this.documentStore);
    }
}

export { AccountManager as A, Builder as B, InterviewManagedDriver as C, Document as D, InterviewMixinDriver as E, InterviewRuleDriver as F, SummaryDbDriver as G, AuditDbDriver as H, InterviewSaveOptions as I, __asyncGenerator as J, KpiGenericDriver as K, __await as L, __asyncDelegator as M, __asyncValues as N, ParticipantSummary as P, Store as S, UserTruenorthDriver as U, __awaiter as _, surveyDeserialize as a, provider as b, config as c, service as d, __rest as e, adminRouter as f, errorMessage as g, isManaged as h, interviewItemDeserialize as i, assertNoSubset as j, SampleStoreDriver as k, SampleCacheDriver as l, UserManagedDriver as m, SurveyStoreDriver as n, SurveyReconciliationDriver as o, participantSerialize as p, SurveyCacheDriver as q, ParticipantStoreDriver as r, surveySerialize as s, ParticipantReconciliationDriver as t, ParticipantMixinDriver as u, ParticipantCacheDriver as v, ParticipantAuditDriver as w, ParticipantSummaryDriver as x, InterviewStoreDriver as y, InterviewAuditDriver as z };
