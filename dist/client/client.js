import { Participant, DomainCollection, hasFixedLabels, InterviewItem, isMLstring, isML, getTranslation, Page, getItem, getItemWording, getItemType, InclusionsBySamples, KPISet, hasPivot, DomainCollectionImpl, Survey, PageSet, PageItem, Interview, Sample, Workflow, SurveyBuilder, PageBuilder, PageSetBuilder, WorkflowBuilder, PageItemBuilder, ParticipantBuilder, InterviewBuilder, InterviewItemBuilder, getVariableName, isComputed, Rules, User } from 'uask-dom';
import deepEqual from 'fast-deep-equal';
import debug from 'debug';
import { Stealer } from 'stealer';

class ParticipantGetOptions {
    constructor() {
        this.offset = 0;
        this.limit = Infinity;
        this.deleted = false;
    }
}

class InterviewSaveOptions {
    constructor() {
        this.strict = true;
    }
}

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
class SummaryGenericDriver {
    constructor(participantDriver, sampleDriver) {
        this.participantDriver = participantDriver;
        this.sampleDriver = sampleDriver;
    }
    getAll(survey, sample, x, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const select = Array.isArray(x) ? x : [];
            options = Array.isArray(x) ? options : x;
            const config = Object.assign(Object.assign(Object.assign({}, new ParticipantGetOptions()), { limit: 20 }), options);
            const participants = yield this.getParticipants(survey, sample, config);
            const summaries = participants.map(p => new ParticipantSummary(survey, p, survey.mainWorkflow));
            return select.length > 0
                ? summaries.map(p => select.reduce((s, q) => (Object.assign(Object.assign({}, s), { [q]: p[q] })), {}))
                : summaries;
        });
    }
    getParticipants(survey, sample, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return sample
                ? yield this.participantDriver.getBySample(survey, sample, options)
                : yield this.participantDriver.getAll(survey, yield this.sampleDriver.getAll(survey), options);
        });
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
function isInterviewItemTarget(target) {
    return (target.participantCode != undefined &&
        target.nonce != undefined &&
        target.variableName != undefined);
}
function isInterviewTarget(target) {
    return target.participantCode != undefined && target.nonce != undefined;
}
function isParticipantTarget(target) {
    return target.participantCode != undefined;
}
class AuditTrail extends Array {
    constructor(records, pageItem, lang) {
        super();
        this.item = new InterviewItem(pageItem, undefined);
        records
            .sort((a, b) => this.compare(a, b))
            .forEach(rec => {
            this.pushValue(rec, lang);
        });
        Object.defineProperty(this, "item", { enumerable: false });
    }
    compare(a, b) {
        return a.isAfter(b) ? 1 : -1;
    }
    pushValue(rec, lang) {
        const current = this.applyChanges(rec);
        if (this.isCreation(rec))
            rec = Object.assign(Object.create(AuditRecord.prototype), Object.assign(Object.assign({}, rec), { operation: "create" }));
        if (this.isRelevant(rec, current))
            this.pushRecord(rec, lang, current);
        this.item = current;
    }
    applyChanges(rec) {
        const changes = Object.assign(Object.assign(Object.assign({}, rec.changes), this.undefValue(rec)), this.undefSpecial(rec));
        return this.item.update(changes);
    }
    undefValue(rec) {
        return rec.changes.specialValue != undefined ||
            Object.keys(rec.changes).length == 0
            ? { value: undefined, unit: undefined }
            : "specialValue" in rec.changes
                ? { specialValue: undefined }
                : {};
    }
    undefSpecial(rec) {
        return rec.changes.value != undefined ||
            Object.keys(rec.changes).length == 0
            ? { specialValue: undefined }
            : "value" in rec.changes
                ? { value: undefined }
                : {};
    }
    isRelevant(rec, current) {
        return rec.operation != "create" || typeof current.label() != "undefined";
    }
    isCreation(rec) {
        return this.length == 0 && rec.operation == "update";
    }
    pushRecord(rec, lang, current) {
        super.push({
            target: rec.target,
            sampleCode: rec.sampleCode,
            date: rec.date,
            operation: rec.operation,
            previous: this.item.label(lang),
            current: current.label(lang),
            user: rec.user,
        });
    }
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
function getAllTags(documents) {
    return documents
        .reduce((res, d) => {
        if (d === null || d === void 0 ? void 0 : d.tags)
            res = res.append(...d.tags);
        return res;
    }, DomainCollection())
        .filter((value, index, it) => it.indexOf(value) === index);
}

function isReponse(r) {
    return (typeof r.response != "undefined" &&
        "json" in r.response &&
        typeof r.response.json == "function");
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
class UaskClientError extends Error {
    constructor(errors) {
        super("uask Error");
        this.errors = errors;
    }
}
function handleClientError(error) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isReponse(error)) {
            const json = yield error.response.json();
            return Promise.reject(json.errors);
        }
        return Promise.reject(JSON.parse(error.response.body).errors);
    });
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

function ruleSerialize(rule) {
    return pick(rule);
}
function ruleDeserialize(ib, rule) {
    const args = rule;
    ib.rule(args);
}

function trakDeserialize(b, t) {
    b.track({ __keys__: t.__keys__ }, { __changes__: t.__changes__ });
}
function trakDeserializeArray(b, t) {
    for (const i in b) {
        trakDeserialize(b[i], t[i]);
    }
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
function clone(survey) {
    const surveyBuilder = new SurveyBuilder();
    const surveyNode = surveySerialize(survey, false);
    surveyDeserialize(surveyBuilder, surveyNode);
    return surveyBuilder;
}

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

class SurveyWebDriver {
    constructor(client) {
        this.client = client;
    }
    getByName(name) {
        const b = new SurveyBuilder();
        const query = "query ($name:String!){survey(name:$name)}";
        const variables = JSON.stringify({ name });
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => {
            surveyDeserialize(b, response.data.survey);
            return b.build();
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    save(survey) {
        const b = new SurveyBuilder();
        const query = {
            query: "mutation ($name: String!, $survey: Json!){ saveSurvey(name: $name, survey: $survey) }",
            variables: { name: survey.name, survey: surveySerialize(survey) },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => {
            surveyDeserialize(b, response.data.saveSurvey);
            return b.build();
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class ParticipantWebDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey, samples, options = { limit: Infinity }) {
        if (options.limit > 20)
            throw "getting more than 20 participants is not allowed by client, use summry driver instead";
        const query = "query ($survey:String!, $offset: Int, $limit:Int){participants(survey:$survey, offset:$offset, limit:$limit)}";
        const variables = JSON.stringify(Object.assign(Object.assign({ survey: survey.name }, new ParticipantGetOptions()), options));
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => response.data.participants.map(p => {
            const b = new ParticipantBuilder(survey, DomainCollection(...samples));
            participantDeserialize(b, p);
            return b.build();
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    getByParticipantCode(survey, samples, participantCode) {
        const b = new ParticipantBuilder(survey, DomainCollection(...samples));
        const query = "query ($survey:String!, $participant:String!){participant(survey:$survey, code:$participant)}";
        const variables = JSON.stringify({
            survey: survey.name,
            participant: participantCode,
        });
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => {
            participantDeserialize(b, response.data.participant);
            return b.build();
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    getBySample(survey, sample, options = { limit: Infinity }) {
        if (options.limit > 20)
            throw "getting more than 20 participants is not allowed by client, use summry driver instead";
        const query = "query ($survey:String!, $sample:String!, $offset:Int!, $limit:Int!){participants(survey:$survey, sample:$sample, offset:$offset, limit:$limit)}";
        const variables = JSON.stringify(Object.assign(Object.assign({ survey: survey.name, sample: sample.sampleCode }, new ParticipantGetOptions()), options));
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => response.data.participants.map(p => {
            const b = new ParticipantBuilder(survey, DomainCollection(sample));
            participantDeserialize(b, p);
            return b.build();
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    save(survey, participant) {
        const { participantCode, sample, interviews } = participant, kwargs = __rest(participant, ["participantCode", "sample", "interviews"]);
        const query = {
            query: participant.participantCode.length > 0
                ? "mutation ($survey:String!, $code:String!, $sample:String!, $kwargs:Json){saveParticipant(survey:$survey, code:$code, sample:$sample, kwargs:$kwargs)}"
                : "mutation ($survey:String!, $sample:String!, $kwargs:Json){createParticipant(survey:$survey, sample:$sample, kwargs:$kwargs)}",
            variables: Object.assign(Object.assign({ survey: survey.name }, (participantCode.length > 0 ? { code: participantCode } : {})), { sample: sample.sampleCode, kwargs }),
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => participant.participantCode.length > 0
            ? response.data.saveParticipant
            : response.data.createParticipant)
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    delete(survey, participant) {
        const query = {
            query: "mutation ($survey: String!, $code: String!, $reason: Json!){ deleteParticipant(survey: $survey, code: $code, reason: $reason) }",
            variables: {
                survey: survey.name,
                code: participant.participantCode,
                reason: participant.__delete__,
            },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(() => { })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

const dlog = debug("uask:drivers");
function LoggingProxy(target) {
    if (isNode && !dlog.enabled)
        return target;
    const name = Object.getPrototypeOf(target).constructor.name;
    return new Proxy(target, {
        get: (t, p, r) => {
            const q = Reflect.get(t, p, r);
            if (!p.toString().startsWith("get") && !p.toString().startsWith("save"))
                return q;
            return (...args) => __awaiter(this, void 0, void 0, function* () {
                const namespace = `${name}.${String(p)}`;
                dlog(namespace, "start");
                const result = yield q.call(t, ...args);
                dlog(namespace, "end");
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

const superUsers = ["developer", "superadministrator"];
const administrators = ["administrator", ...superUsers];
const writers = ["writer", ...superUsers];
class ParticipantAuthorizationManager {
    constructor(survey, participant, user) {
        this.survey = survey;
        this.participant = participant;
        this.user = user;
    }
    get workflow() {
        var _a;
        return this.user
            ? (_a = this.survey.workflow(this.user.workflow)) !== null && _a !== void 0 ? _a : this.survey.mainWorkflow
            : this.survey.mainWorkflow;
    }
    canDelete() {
        return !this.canDeleteError();
    }
    canDeleteError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...administrators))
            return "role is not authorized to delete";
        if (this.isFrozen())
            return "sample is frozen";
        return "";
    }
    canCreate() {
        return !this.canCreateError();
    }
    canCreateError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...writers))
            return "role is not authorized to create items";
        if (this.isFrozen())
            return "sample is frozen";
        return "";
    }
    canWriteItems(interview) {
        return !this.canWriteItemsError(interview);
    }
    canWriteItemsError(interview) {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...writers))
            return "role is not authorized to write items";
        if (this.isInWorkflow(interview))
            return "workflow is not authorized to write items for interview";
        if (this.isFrozen())
            return "sample is frozen";
        return "";
    }
    isFrozen() {
        return this.participant.sample.frozen;
    }
    isInRole(...roles) {
        return this.user ? roles.includes(this.user.role) : false;
    }
    isInWorkflow(interview) {
        return !this.workflow.pageSets.includes(interview.pageSet);
    }
}
class SurveyAuthorizationManager {
    constructor(survey, user) {
        this.survey = survey;
        this.user = user;
    }
    canReadSample(sampleCode) {
        return !this.canReadSampleError(sampleCode);
    }
    canReadSampleError(sampleCode) {
        if (!this.user)
            return "unknown user";
        if (this.user.sampleCodes &&
            this.user.sampleCodes.length > 0 &&
            !this.user.sampleCodes.includes(sampleCode))
            return "not authorized to read participants from sample";
        return "";
    }
    canReadParticipant(participantCode) {
        return !this.canReadParticipantError(participantCode);
    }
    canReadParticipantError(participantCode) {
        if (!this.user)
            return "unknown user";
        if (this.user.participantCodes &&
            this.user.participantCodes.length > 0 &&
            !this.user.participantCodes.includes(participantCode))
            return "not authorized to read participant";
        return "";
    }
    canSaveUser() {
        return !this.canSaveUserError();
    }
    canSaveUserError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...administrators))
            return "role is not authorized to save user";
        return "";
    }
    canSaveSurvey() {
        return !this.canSaveSurveyError();
    }
    canSaveSurveyError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...administrators))
            return "role is not authorized to save survey";
        return "";
    }
    canSaveSample() {
        return !this.canSaveSampleError();
    }
    canSaveSampleError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...administrators))
            return "role is not authorized to save sample";
        return "";
    }
    canSaveDocument(document) {
        return !this.canSaveDocumentError(document);
    }
    canSaveDocumentError(document) {
        if (!this.user)
            return "unknown user";
        if (document.visibility == "survey" && !this.isInRole(...administrators))
            return "role is not authorized to save survey document";
        if (document.visibility == "participant" && !this.isInRole(...writers))
            return "role is not authorized to save participant document";
        return "";
    }
    isInRole(...roles) {
        return this.user ? roles.includes(this.user.role) : false;
    }
}

class FluentGenerator {
    constructor() {
        this.code = [];
        this.current = [];
        this.argCount = 0;
        this.optionalArgs = [];
    }
    get isEmpty() {
        return this.code.length == 0 && this.current.length == 0;
    }
    cancel() {
        if (this.current.length > 0)
            this.current = [];
        else if (this.code.length > 0)
            this.code.pop();
        this.argCount = 0;
    }
    compose(gen, prefix = 1, indent = typeof prefix == "string" ? 1 : prefix + 1) {
        this.initCall();
        this.code.push([() => gen.build(prefix, indent)]);
        return this;
    }
    call(name) {
        this.initCall();
        this.current.push(name, "(");
        return this;
    }
    prop(name) {
        this.initCall();
        this.current.push(name);
        return this;
    }
    arg(arg) {
        if (this.argCount > 0)
            this.current.push(", ");
        this.argCount++;
        this.pushArg(arg);
        return this;
    }
    pushArg(arg) {
        if (typeof arg == "string")
            this.current.push(`"${arg}"`);
        else if (typeof arg == "function")
            this.current.push(arg);
        else if (Array.isArray(arg)) {
            this.current.push("[");
            arg.forEach((a, i) => {
                if (i > 0)
                    this.current.push(", ");
                this.pushArg(a);
            });
            this.current.push("]");
        }
        else if (typeof arg == "object")
            this.current.push(JSON.stringify(arg));
        else
            this.current.push(String(arg));
    }
    args(...args) {
        for (const arg of args)
            this.arg(arg);
        return this;
    }
    opt(arg) {
        if (typeof arg == "undefined")
            this.optionalArgs.push(arg);
        else {
            this.args(...this.optionalArgs, arg);
            this.optionalArgs = [];
        }
        return this;
    }
    opts(...args) {
        for (const arg of args)
            this.opt(arg);
        return this;
    }
    build(prefix = "", indent = 1) {
        this.initCall();
        if (this.code.length == 0)
            return "";
        return `${typeof prefix == "string" ? prefix : "  ".repeat(prefix)}${this.code
            .map(c => this.buildInstruction(c, prefix))
            .filter(i => i != "")
            .join("\n" + "  ".repeat(indent))}`;
    }
    buildInstruction(instr, prefix) {
        return instr.map(tok => this.getToken(tok, prefix)).join("");
    }
    getToken(tok, prefix) {
        return typeof tok == "string" ? tok : tok(prefix);
    }
    initCall() {
        if (this.current.length > 0) {
            if (this.current.length == 1)
                this.code.push([".", this.current[0]]);
            else
                this.code.push([".", ...this.current, ")"]);
            this.current = [];
            this.optionalArgs = [];
            this.argCount = 0;
        }
    }
}

function getDynamicArgs(variableNames, args) {
    const formula = reverseFormula(args[0], variableNames, args);
    return extractFormula(formula);
}
function reverseFormula(formula, variableNames, a) {
    for (let i = a[1]; i > 0; i--) {
        formula = formula.replace(new RegExp(`\\$${i}`, "g"), variableNames[i - 1]);
    }
    return formula;
}
function extractFormula(formula) {
    const extract = /^\[(.*)\]$/.exec(formula);
    if (extract == null)
        return extractElement(formula);
    return [extractFormula(extract[1])];
}
function extractElement(content) {
    const elementExpr = /(^|,)(([^,()']+|(\[.*\])|((\(.*\))|('[^']*'))*)+)(?=(,|$))/g;
    let elementMatch;
    const result = [];
    while ((elementMatch = elementExpr.exec(content))) {
        const element = elementMatch[2];
        result.push(element);
    }
    return result;
}
function regenerateDynamic(pageItemGenerator, rule, values, ...extraArgs) {
    switch (rule) {
        case "inRange":
            pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.inRange(asComputed(values[0]), asComputed(values[1]), extraArgs[0]);
            break;
        case "critical":
            pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.critical(asComputed(values[0]), asComputed(values[1]), asComputed(values[2]));
            break;
        case "required":
        case "maxLength":
        case "fixedLength":
        case "decimalPrecision":
        case "letterCase":
            pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.rule(rule, ...values);
            break;
        case "activation":
            if (extraArgs[0] == "enable")
                pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.activateWhen(values[0][0]);
            else
                pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.visibleWhen(values[0][0]);
            break;
    }
}
function asComputed(value) {
    return typeof value == "string" ? { formula: value } : value;
}

function transposeML(labels, options = {}) {
    return labels.reduce((acc, label) => pushTranslations(acc, label, options), {});
}
function pushTranslations(acc, label, options) {
    var _a;
    if (typeof label == "string")
        pushTranslation(acc, (_a = options.defaultLang) !== null && _a !== void 0 ? _a : "en", label);
    else
        for (const [lang, wording] of Object.entries(label))
            if (isLanguage(options, lang))
                pushTranslation(acc, lang, wording);
    return acc;
}
function pushTranslation(acc, lang, wording) {
    acc[lang] = acc[lang] ? [...acc[lang], wording] : [wording];
}
function defaultLang(options) {
    var _a;
    return ((_a = options.defaultLang) !== null && _a !== void 0 ? _a : "en");
}
function isLanguage(options, lang) {
    var _a;
    return (((_a = options.languages) === null || _a === void 0 ? void 0 : _a.includes(lang)) ||
        lang == options.defaultLang ||
        lang == "en" ||
        lang == "__code__");
}

function getTypeGenerator(type, options = {}) {
    type = Object.assign({}, type);
    const generator = new FluentGenerator();
    switch (type.name) {
        case "scale": {
            const { name, min, max } = type;
            generator.call(name).args(min, max);
            if (type.labels)
                translateTypeLabels(generator, type, options);
            return generator;
        }
        case "score":
            generator.call(type.name).args(...type.scores);
            if (type.labels)
                translateTypeLabels(generator, type, options);
            return generator;
        case "date":
            generator
                .call("date")
                .opt(type.incomplete || undefined)
                .opt(type.month || undefined);
            return generator;
        case "choice":
        case "glossary":
            generator
                .call(type.name)
                .args(type.multiplicity, ...type.choices);
            if (type.labels && type.labels != type.choices)
                translateTypeLabels(generator, type, options);
            return generator;
        case "countries":
            generator.call(type.name).arg(type.multiplicity);
            return generator;
        case "context": {
            const { name } = type, types = __rest(type, ["name"]);
            generator.call(name);
            generator.arg(Object.values(types).map(t => (prefix) => getTypeGenerator(t).build(`\n      ${prefix}`, 5)));
            return generator;
        }
        case "time":
            generator.call("time").opt(type.duration || undefined);
            return generator;
        case "text":
        case "real":
        case "integer":
        case "yesno":
        case "acknowledge":
        case "image":
        case "info":
            generator.prop(type.name);
            return generator;
    }
}
function translateTypeLabels(generator, type, options) {
    const gen = new FluentGenerator();
    const _a = transposeML(type.labels, options), _b = defaultLang(options), def = _a[_b], others = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    gen.call("wording").args(...def);
    for (const [lang, labels] of Object.entries(others))
        if (lang != "__code__")
            gen.call("translate").args(lang, ...labels);
    generator.compose(gen, 3, 5);
}

class PageItemGenerator {
    constructor(builder, options = {}, typeFactory = "b.types") {
        this.builder = builder;
        this.options = options;
        this.typeFactory = typeFactory;
        this.generator = new FluentGenerator();
        this.variableName = undefined;
    }
    build() {
        return this.generator.build();
    }
    question(x, y, z, t, ...o) {
        if (this.isamplemTypeLike(z) && z.name == "info" && isMLstring(x))
            return this.info(x, y);
        if (this.generator.isEmpty) {
            this.variableName =
                typeof y == "string" ? y : typeof x == "string" ? x : "";
            const { yy, zz, tt, oo } = this.mayBeTypes(y, z, t, o);
            const _a = transposeML(Array.isArray(x) ? x : [x], this.options), _b = defaultLang(this.options), def = _a[_b], others = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            if (Array.isArray(x)) {
                this.multipleWordings(def, yy, zz, tt, oo);
            }
            else {
                this.singleWording(def[0], yy, zz, tt, oo);
            }
            this.translateWordings(others);
            return this;
        }
        return this.builder.question(x, y, z, t, ...o);
    }
    mayBeTypes(y, z, t, o) {
        const yy = this.mayBeType(y);
        const zz = this.mayBeType(z);
        const tt = this.mayBeType(t);
        const oo = o === null || o === void 0 ? void 0 : o.map(t => this.mayBeType(t));
        return { yy, zz, tt, oo };
    }
    mayBeType(o) {
        if (this.isamplemTypeLike(o))
            return () => getTypeGenerator(o, this.options).build(this.typeFactory, 2);
        return o;
    }
    isamplemTypeLike(o) {
        return typeof o == "object" && o != null && "name" in o;
    }
    singleWording(wording, yy, zz, tt, oo) {
        this.generator
            .call("question")
            .args(this.esc(wording), yy)
            .opts(zz, tt, ...oo);
    }
    multipleWordings(wordings, yy, zz, tt, oo) {
        this.generator
            .call("question")
            .args(yy, zz)
            .opts(tt, ...oo);
        this.generator.call("wordings").args(...wordings.map(w => this.esc(w)));
    }
    translateWordings(translations) {
        for (const [lang, wordings] of Object.entries(translations)) {
            this.generator
                .call("translate")
                .args(lang, ...wordings.map(w => this.esc(w)));
        }
    }
    esc(wording) {
        return wording.replace(/[\\"]/g, "\\$&");
    }
    info(wording, name) {
        if (this.generator.isEmpty) {
            this.variableName = name;
            if (isMLstring(wording)) {
                const _a = transposeML([wording], this.options), _b = defaultLang(this.options), def = _a[_b], others = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                this.generator.call("info").args(this.esc(def[0]), name);
                this.translateWordings(others);
            }
            else {
                this.generator.call("info").args(wording.map(w => this.esc(w)), name);
            }
            return this;
        }
        return this.builder.info(wording, name);
    }
    include(pageName, mode) {
        return this.builder.include(pageName, mode);
    }
    startSection(title) {
        return this.builder.startSection(title);
    }
    endSection() {
        return this.builder.endSection();
    }
    unit(...units) {
        if (units.length > 0)
            this.generator.call("unit").args(...units);
        return this;
    }
    extendable() {
        const gen = new FluentGenerator().call("extendable");
        this.generator.compose(gen);
        return this;
    }
    translate(lang, translation, ...contexts) {
        this.generator.call("translate").args(lang, translation, ...contexts);
        return this;
    }
    required(formula) {
        this.generator.call("required").opt(formula);
        return this;
    }
    critical(tag, message, ...x) {
        tag = this.unquote(tag);
        message = this.unquote(message);
        this.generator
            .call("critical")
            .arg(tag)
            .opts(message, ...x);
        return this;
    }
    unquote(v) {
        if (isComputed(v) && /^'[^']*'$/.test(v.formula))
            return v.formula.slice(1, -1);
        return v;
    }
    inRange(min, max, limits = { includeLower: true, includeUpper: true }) {
        this.generator.call("inRange").args(min, max).opt(limits);
        return this;
    }
    inPeriod(min, max, limits) {
        this.generator.call("inPeriod").args(min, max).opt(limits);
        return this;
    }
    comment(comment) {
        this.generator.call("comment").arg(comment);
        return this;
    }
    pin(title) {
        this.generator.call("pin").arg(title);
        return this;
    }
    kpi(title, pivot) {
        this.generator.call("kpi").arg(title).opt(pivot);
        return this;
    }
    maxLength(maxLength) {
        this.generator.call("maxLength").arg(maxLength);
        return this;
    }
    decimalPrecision(precision) {
        this.generator.call("decimalPrecision").arg(precision);
        return this;
    }
    fixedLength(length) {
        this.generator.call("fixedLength").arg(length);
        return this;
    }
    computed(formula) {
        this.generator.call("computed").arg(formula);
        return this;
    }
    memorize() {
        this.generator.call("memorize");
        return this;
    }
    letterCase(letterCase) {
        this.generator.call("letterCase").arg(letterCase);
        return this;
    }
    activateWhen(formula, ...values) {
        this.generator.call("activateWhen").args(formula, ...values);
        return this;
    }
    visibleWhen(formula, ...values) {
        this.generator.call("visibleWhen").args(formula, ...values);
        return this;
    }
    modifiableWhen(formula, ...values) {
        this.generator.call("modifiableWhen").args(formula, ...values);
        return this;
    }
    rule(rule, ...args) {
        const name = typeof rule == "object" ? rule.name : rule;
        const a = typeof rule == "object" ? Rules.args(rule) : args;
        switch (name) {
            case "required":
                return this.required((a[0] === true ? undefined : a[0]));
            case "critical":
                return this.critical(a[0], a[1], ...a.slice(2));
            case "inRange":
                return this.inRange(a[0], a[1], a[2]);
            case "maxLength":
                return this.maxLength(a[0]);
            case "fixedLength":
                return this.fixedLength(a[0]);
            case "decimalPrecision":
                return this.decimalPrecision(a[0]);
            case "letterCase":
                return this.letterCase(a[0]);
            case "computed":
            case "activation":
            case "constant":
            case "copy":
                this.generator.call("rule").args("dynamic", name, ...a);
                return this;
            case "dynamic":
                regenerateDynamic(this, a[0], getDynamicArgs([this.variableName], a[1])[0], ...a.slice(2));
                return this;
        }
    }
    defaultValue(defaultValue) {
        this.generator.call("defaultValue").arg(defaultValue);
        return this;
    }
    wordings(wording1, wording2, ...contexts) {
        this.generator.call("wordings").args(wording1, wording2, ...contexts);
        return this;
    }
    track() { }
}

class PageGenerator {
    constructor(builder, options = {}, typeFactory = "b.types") {
        this.builder = builder;
        this.options = options;
        this.typeFactory = typeFactory;
        this.generator = new FluentGenerator();
        this.currentGenerator = this.generator;
        this.inSection = "";
        this.anonymousSection = " ";
        this.items = [];
    }
    build() {
        return this.generator.build("  ", 1);
    }
    translate(lang, translation) {
        this.currentGenerator.call("translate").args(lang, translation);
        return this;
    }
    exportTo(conf) {
        this.generator.call("exportTo").arg(conf);
        return this;
    }
    include(pageName, mode) {
        this.currentGenerator = new FluentGenerator();
        this.generator.call("include").arg(pageName).opt(mode);
        this.generator.compose(this.currentGenerator);
        return this;
    }
    select(...variableNames) {
        this.currentGenerator.call("select").args(...variableNames);
        return this;
    }
    context(variableName, ctx) {
        this.currentGenerator.call("context").args(variableName, ctx);
        return this;
    }
    startSection(title) {
        if (title) {
            const _a = transposeML([title], this.options), _b = defaultLang(this.options), def = _a[_b], others = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            if (this.inSection != def[0]) {
                this.inSection = def[0];
                this.generator.call("startSection").arg(def[0]);
                this.currentGenerator = new FluentGenerator();
                this.generator.compose(this.currentGenerator);
                for (const [lang, translation] of Object.entries(others))
                    this.currentGenerator.call("translate").args(lang, translation[0]);
            }
        }
        else {
            this.startSection(this.anonymousSection);
            this.anonymousSection += " ";
        }
        return this;
    }
    endSection() {
        this.currentGenerator.call("endSection");
        this.currentGenerator = this.generator;
        this.inSection = "";
        return this;
    }
    activateWhen(variableName, ...values) {
        this.currentGenerator.call("activateWhen").args(variableName, ...values);
        return this;
    }
    visibleWhen(variableName, ...values) {
        this.currentGenerator.call("visibleWhen").args(variableName, ...values);
        return this;
    }
    modifiableWhen(variableName, ...values) {
        this.currentGenerator.call("modifiableWhen").args(variableName, ...values);
        return this;
    }
    question(x, y, z, t, ...o) {
        if (this.inSection.length == 0)
            this.currentGenerator = this.generator;
        const pageItemGenerator = new PageItemGenerator(this, this.options, this.typeFactory);
        pageItemGenerator.question(x, y, z, t, ...o);
        this.currentGenerator.compose(pageItemGenerator.generator, 0, this.inSection == "" ? 2 : 3);
        this.items.push(pageItemGenerator);
        return pageItemGenerator;
    }
    info(wording, name) {
        const pageItemGenerator = new PageItemGenerator(this, this.options, this.typeFactory);
        pageItemGenerator.info(wording, name);
        this.currentGenerator.compose(pageItemGenerator.generator, 0, 2);
        this.items.push(pageItemGenerator);
        return pageItemGenerator;
    }
    track() { }
}

class PageSetGenerator {
    constructor(builder, options = {}) {
        this.builder = builder;
        this.options = options;
        this.generator = new FluentGenerator();
    }
    build() {
        return this.generator.build();
    }
    pageSet(type) {
        if (this.generator.isEmpty) {
            const _a = transposeML([type], this.options), { __code__ } = _a, _b = defaultLang(this.options), def = _a[_b], others = __rest(_a, ["__code__", typeof _b === "symbol" ? _b : _b + ""]);
            if (typeof __code__ != "undefined") {
                this.generator.call("pageSet").arg(__code__[0]);
                this.generator
                    .call("translate")
                    .args(defaultLang(this.options), def[0]);
            }
            else
                this.generator.call("pageSet").arg(def[0]);
            for (const [lang, type] of Object.entries(others))
                this.generator.call("translate").args(lang, type[0]);
            return this;
        }
        else
            return this.builder.pageSet(type);
    }
    translate(lang, translation) {
        this.generator.call("translate").args(lang, translation);
        return this;
    }
    datevariable(datevariable) {
        this.generator.call("datevariable").arg(datevariable);
        return this;
    }
    pages(...pageDefs) {
        this.generator.call("pages").args(...pageDefs);
        return this;
    }
    track() { }
}

class LazyGenerator extends FluentGenerator {
    constructor(lazy) {
        super();
        this.lazy = lazy;
    }
    build(prefix, indent) {
        this.lazy();
        return super.build(prefix, indent);
    }
}
class WorkflowGenerator {
    constructor() {
        this.generator = new LazyGenerator(() => this.lazy());
        this._home = [];
        this._seq = [];
        this._n = [];
        this._one = [];
        this._end = [];
        this._notifications = [];
        this.pageSetGenerator = new FluentGenerator();
        this.generator.compose(this.pageSetGenerator, 0);
    }
    build() {
        return this.generator.build("", 0);
    }
    lazy() {
        this.pageSetGenerator.call("home").arg(this._home[0]);
        const initial = this._seq.filter(n => !this._n.includes(n));
        if (initial.length > 0)
            this.pageSetGenerator.call("initial").args(...initial);
        const followUp = this._seq.filter(n => this._n.includes(n));
        if (followUp.length > 0)
            this.pageSetGenerator.call("followUp").args(...followUp);
        if (this._end.length > 0)
            this.pageSetGenerator.call("terminal").args(...this._end);
        const auxiliary = this._n.filter(n => !this._seq.includes(n));
        if (auxiliary.length > 0)
            this.pageSetGenerator.call("auxiliary").args(...auxiliary);
        if (this._notifications.length > 0)
            this.generator.call("notify").args(...this._notifications);
    }
    home(name) {
        this._home.push(name);
        return this;
    }
    initial(...names) {
        this._seq.push(...names);
        return this;
    }
    followUp(...names) {
        this._seq.push(...names);
        this._n.push(...names);
        return this;
    }
    auxiliary(...names) {
        this._n.push(...names);
        return this;
    }
    terminal(...names) {
        return this.end(...names);
    }
    end(...names) {
        this._end.push(...names);
        return this;
    }
    seq(...names) {
        this._seq.push(...names);
        return this;
    }
    n(...names) {
        this._n.push(...names);
        return this;
    }
    one(...names) {
        this._one.push(...names);
        return this;
    }
    notify(...events) {
        this._notifications.push(...events);
        return this;
    }
    track() { }
}
class DerivedWorkflowGenerator {
    constructor() {
        this.generator = new LazyGenerator(() => this.lazy());
        this.pageSets = new Set();
        this.notifications = new Set();
    }
    build() {
        return this.generator.build("", 0);
    }
    lazy() {
        this.generator.call("withPageSets").args(...this.pageSets);
        if (this.notifications.size > 0)
            this.generator.call("notify").args(...this.notifications);
    }
    home(name) {
        this.pageSets.add(name);
        return this;
    }
    end(...names) {
        for (const name of names)
            this.pageSets.add(name);
        return this;
    }
    seq(...names) {
        for (const name of names)
            this.pageSets.add(name);
        return this;
    }
    n(...names) {
        for (const name of names)
            this.pageSets.add(name);
        return this;
    }
    one(...names) {
        for (const name of names)
            this.pageSets.add(name);
        return this;
    }
    withPageSets(...types) {
        for (const name of types)
            this.pageSets.add(name);
        return this;
    }
    notify(...events) {
        for (const ev of events)
            this.notifications.add(ev);
        return this;
    }
    track() { }
}

class SurveyGenerator {
    constructor() {
        this.generator = new FluentGenerator();
        this.config = {};
        this.pages = [];
    }
    build() {
        return this.generator.build("", 0);
    }
    options(options) {
        this.config = Object.assign(this.options, options);
        const gen = new FluentGenerator();
        gen.call("options").arg(() => JSON.stringify(options, null, 2));
        this.generator.compose(gen, "\nb");
    }
    strict() {
        this.generator.call("strict");
    }
    survey(name) {
        const gen = new FluentGenerator();
        gen.call("survey").arg(name);
        this.generator.compose(gen, "\nb");
        return this;
    }
    visit(type) {
        return this.pageSet(type);
    }
    pageSet(type) {
        const pageSetGenerator = new PageSetGenerator(this, this.config);
        this.generator.compose(pageSetGenerator.generator);
        pageSetGenerator.pageSet(type);
        return pageSetGenerator;
    }
    page(name) {
        const gen = new FluentGenerator();
        const pageGenerator = this.generatePage(gen, name);
        this.generator.compose(gen, "\nb");
        this.pages.push(pageGenerator);
        return pageGenerator;
    }
    generatePage(gen, name) {
        this.translatePageName(name, gen);
        const contentGenerator = new PageGenerator(this, this.config);
        gen.compose(contentGenerator.generator, 0);
        return contentGenerator;
    }
    translatePageName(name, gen) {
        const _a = transposeML([name], this.config), { __code__ } = _a, _b = defaultLang(this.config), def = _a[_b], others = __rest(_a, ["__code__", typeof _b === "symbol" ? _b : _b + ""]);
        if (typeof __code__ != "undefined") {
            gen.call("page").arg(__code__[0]);
            gen.call("translate").args(defaultLang(this.config), def[0]);
        }
        else
            gen.call("page").arg(def[0]);
        for (const [lang, translation] of Object.entries(others))
            gen.call("translate").args(lang, translation[0]);
    }
    workflow(w = "main", ...names) {
        const name = typeof w == "string" || typeof w == "undefined" ? w : w.name;
        const gen = new FluentGenerator();
        if (name != "main") {
            gen.call("workflow").opts(name, ...names);
            const workflowGenerator = new DerivedWorkflowGenerator();
            gen.compose(workflowGenerator.generator, 0);
            this.generator.compose(gen, "\nb");
            return workflowGenerator;
        }
        gen.call("workflow");
        const workflowGenerator = new WorkflowGenerator();
        gen.compose(workflowGenerator.generator, 0);
        this.generator.compose(gen, "\nb");
        return workflowGenerator;
    }
    trigger(when) {
        if (when == "initialization")
            this.generator.call("trigger").arg(when);
        return this;
    }
    activateWhen(target, activator, ...values) {
        const pageItemGenerator = this.getTargetGenerator([target]);
        pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.activateWhen(activator, ...values);
        return this;
    }
    visibleWhen(target, activator, ...values) {
        const pageItemGenerator = this.getTargetGenerator([target]);
        pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.visibleWhen(activator, ...values);
        return this;
    }
    modifiableWhen(target, variableName, ...values) {
        const pageItemGenerator = this.getTargetGenerator([target]);
        pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.modifiableWhen(variableName, ...values);
        return this;
    }
    copy(target, source) {
        const pageItemGenerator = this.getTargetGenerator([target]);
        pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.defaultValue({ source });
        return new Proxy(this, {
            get: (t, p, r) => {
                if (p == "trigger")
                    return () => t;
                return Reflect.get(t, p, r);
            },
        });
    }
    computed(target, formula) {
        const pageItemGenerator = this.getTargetGenerator([target]);
        pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.computed(formula);
        return new Proxy(this, {
            get: (t, p, r) => {
                if (p == "trigger")
                    return (when) => {
                        if (when == "initialization") {
                            pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.generator.cancel();
                            pageItemGenerator === null || pageItemGenerator === void 0 ? void 0 : pageItemGenerator.defaultValue({ formula });
                        }
                        return t;
                    };
                return Reflect.get(t, p, r);
            },
        });
    }
    dynamic(variableNames, rule, values, ...extraArgs) {
        const pageItemGenerator = this.getTargetGenerator(variableNames);
        regenerateDynamic(pageItemGenerator, rule, values, ...extraArgs);
        return this;
    }
    getTargetGenerator(variableNames) {
        const target = variableNames[variableNames.length - 1];
        return this.pages.reduce((a, page) => typeof a == "undefined"
            ? page.items.find(i => i.variableName == target)
            : a, undefined);
    }
    rule(variableNames, name, ...args) {
        const rule = typeof name == "string" ? name : name.name;
        const a = typeof name == "string" ? args : Rules.args(name);
        switch (rule) {
            case "activation":
                return (a[1] == "enable" ? this.activateWhen : this.visibleWhen).call(this, variableNames[1], variableNames[0], ...a[0]);
            case "copy":
                return this.copy(variableNames[1], variableNames[0]);
            case "computed":
                return this.computed(variableNames[variableNames.length - 1], getDynamicArgs(variableNames, a)[0]);
            case "dynamic":
                return this.dynamic(variableNames, a[0], getDynamicArgs(variableNames, a[1])[0], ...a.slice(2));
            default:
                return this;
        }
    }
    track() { }
}
function generateDSL(survey) {
    const json = surveySerialize(survey);
    const generator = new SurveyGenerator();
    surveyDeserialize(generator, json);
    const dsl = generator.build();
    return dslHelpers(dsl);
}
function dslHelpers(dsl) {
    return dsl
        .replace(/\{"formula":"#([0-9-]*)#"\}/g, 'b.date("$1")')
        .replace(/\{"formula":"([^"]*)"\}/g, 'b.computed("$1")')
        .replace(/\{"name":"([^"]*)","mandatory":true\}/g, 'b.mandatory("$1")')
        .replace(/b\.types\.context\(\[((.|\n)*)\]\)/, "$1");
}

class InterviewWebDriver {
    constructor(client) {
        this.client = client;
    }
    save(survey, participant, interview, items = interview.items, options) {
        options = { strict: !!(options === null || options === void 0 ? void 0 : options.strict) };
        const pageSet = getTranslation(interview.pageSet.type, "__code__", survey.options.defaultLang);
        if (interview.nonce == 0) {
            return this.createInterview(survey, participant, pageSet, interview, items, options);
        }
        return this.saveItems(survey, participant, interview, items, options);
    }
    saveItems(survey, participant, interview, interviewItems, options) {
        const items = [...interviewItems.map(item => interviewItemSerialize(item))];
        const query = {
            query: "mutation ($survey: String!, $participant: String!, $nonce: BigInt!, $items: [Json!]!, $strict: Boolean){ saveInterview(survey: $survey, participant: $participant, nonce: $nonce, items: $items, strict: $strict) }",
            variables: {
                survey: survey.name,
                participant: participant.participantCode,
                nonce: interview.nonce,
                items,
                strict: !!options.strict,
            },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => response.data.saveInterview)
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    createInterview(survey, participant, pageSet, interview, interviewItems, options) {
        const items = interviewItems
            ? [...interviewItems.map(item => interviewItemSerialize(item))]
            : undefined;
        const variables = {
            survey: survey.name,
            participant: participant.participantCode,
            pageSet,
            nonce: interview.nonce,
            strict: !!options.strict,
        };
        const query = items
            ? {
                query: `mutation ($survey: String!, $participant: String!, $pageSet: String!, $items: [Json!], $strict: Boolean){ createInterview(survey: $survey, participant: $participant, pageSet: $pageSet, items: $items, strict: $strict) }`,
                variables: Object.assign(Object.assign({}, variables), { items }),
            }
            : {
                query: `mutation ($survey: String!, $participant: String!, $pageSet: String!, $strict: Boolean){ createInterview(survey: $survey, participant: $participant, pageSet: $pageSet, strict: $strict) }`,
                variables,
            };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => response.data.createInterview)
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    delete(survey, participant, interview) {
        const query = {
            query: "mutation ($survey: String!, $participant: String!, $nonce: BigInt!, $reason: Json!){ deleteInterview(survey: $survey, participant: $participant, nonce: $nonce, reason: $reason) }",
            variables: {
                survey: survey.name,
                participant: participant.participantCode,
                nonce: interview.nonce,
                reason: interview.__delete__,
            },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(() => { })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class SummaryWebDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey, sample, x, options) {
        const select = Array.isArray(x)
            ? x
            : [
                "participantCode",
                "sampleCode",
                "currentInterview",
                "interviewCount",
                "pins",
                "alerts",
                "included",
            ];
        options = Array.isArray(x) ? options : x;
        const fragment = select.join(",");
        const query = `query ($survey:String!, $sample:String, $offset:Int, $limit:Int){summary(survey:$survey, sample:$sample, offset:$offset, limit:$limit){${fragment}}}`;
        const variables = JSON.stringify(Object.assign(Object.assign(Object.assign({ survey: survey.name }, (sample ? { sample: sample.sampleCode } : {})), new ParticipantGetOptions()), options));
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => response.data.summary.map(s => {
            if (typeof s.currentInterview != "undefined" &&
                typeof s.currentInterview.date != "undefined")
                s.currentInterview.date = new Date(s.currentInterview.date);
            return s;
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class SampleWebDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey) {
        const query = "query ($survey:String!){samples(survey:$survey)}";
        const variables = JSON.stringify({ survey: survey.name });
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => response.data.samples.map(s => new Sample(s.sampleCode, s)))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    getBySampleCode(survey, sampleCode) {
        return this.getAll(survey).then(s => {
            var _a;
            return (_a = s.find(e => e.sampleCode == sampleCode)) !== null && _a !== void 0 ? _a : Promise.reject([errorMessage("unknown sample")]);
        });
    }
    save(survey, sample) {
        const query = {
            query: "mutation ($survey: String!, $sample: Json!){ saveSample(survey: $survey, sample: $sample) }",
            variables: {
                survey: survey.name,
                sample: sample,
            },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => {
            const sample = response.data.saveSample;
            return new Sample(sample.sampleCode, sample);
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class AuditWebDriver {
    constructor(client) {
        this.client = client;
    }
    get(survey, target, operations) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "query ($survey: String!,$participant: String!,$nonce: BigInt,$variableName: String,$instance: Int, $operations:[Json!]){auditRecords(survey:$survey,participantCode:$participant,nonce:$nonce,variableName:$variableName,instance:$instance,operations:$operations)}";
            const variables = JSON.stringify({
                survey: survey.name,
                participant: target.participantCode,
                nonce: target.nonce,
                variableName: target.variableName,
                instance: target.instance,
                operations,
            });
            return this.client
                .get("graphql", { searchParams: { query, variables } })
                .json()
                .then(response => response.data.auditRecords.map(rec => Object.assign(Object.create(AuditRecord.prototype), Object.assign(Object.assign({}, rec), { date: new Date(rec.date) }))))
                .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
        });
    }
}

class UserWebDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey) {
        const query = `admin/${survey.name}/users`;
        return this.client
            .get(query)
            .json()
            .then(response => response.map(u => this.createUser(u)))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    createUser(u) {
        return new User(u.name, u.firstName, u.title, u.workflow, u.email, u.phone, u.sampleCodes, u.participantCodes, {
            role: u.role,
            email_verified: u.email_verfied,
            id: u.id,
            userid: u.userid,
        });
    }
    getByUserId(survey, userid) {
        const route = `admin/${survey.name}/users/${userid}`;
        return this.client
            .get(route)
            .json()
            .then(response => this.createUser(response))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    save(survey, user) {
        const route = `admin/${survey.name}/users/${user.userid}`;
        return this.client
            .post(route, { json: user })
            .json()
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class DocumentWebDriver {
    constructor(client) {
        this.client = client;
    }
    save(survey, document) {
        const route = `document/${survey.name}/${document.hash}`;
        return this.client
            .post(route, { json: document })
            .json();
    }
    delete(survey, hash) {
        throw new Error(`Use delete endpoint /document/${survey.name}/${hash}`);
    }
    getByHash(survey, hash) {
        const query = `document/${survey.name}/${hash}`;
        return this.client
            .get(query)
            .json()
            .then(d => {
            const { name, title, tags, content } = d, other = __rest(d, ["name", "title", "tags", "content"]);
            return new Document(name, title, tags, Object.assign({}, other));
        });
    }
    getAll(survey) {
        const query = `document/${survey.name}/all`;
        return this.client
            .get(query)
            .json()
            .then(response => response.map(d => {
            const { name, title, tags } = d, other = __rest(d, ["name", "title", "tags"]);
            return new Document(name, title, tags, Object.assign({}, other));
        }));
    }
    saveContent(survey, hash) {
        throw new Error(`Use upload endpoint /document/${survey.name}/${hash}/content`);
    }
    getContent(survey, hash) {
        throw new Error(`Use download endpoint /document/${survey.name}/${hash}/content`);
    }
}

class ClientDrivers {
    constructor(client) {
        this.client = client;
        this.surveyDriver = Builder.decorate(SurveyWebDriver, client)
            .withLogging()
            .get();
        this.participantDriver = Builder.decorate(ParticipantWebDriver, client)
            .withLogging()
            .get();
        this.sampleDriver = Builder.decorate(SampleWebDriver, client)
            .withLogging()
            .with(SampleCacheDriver)
            .withLogging()
            .get();
        this.interviewDriver = Builder.decorate(InterviewWebDriver, client)
            .withLogging()
            .get();
        this.summaryDriver = Builder.decorate(SummaryWebDriver, client)
            .withLogging()
            .get();
        this.auditDriver = Builder.decorate(AuditWebDriver, client)
            .withLogging()
            .get();
        this.userDriver = Builder.decorate(UserWebDriver, client)
            .withLogging()
            .get();
        this.documentDriver = Builder.decorate(DocumentWebDriver, client)
            .withLogging()
            .get();
        this.kpiDriver = Builder.decorate(KpiGenericDriver, this.sampleDriver, this.summaryDriver)
            .withLogging()
            .get();
    }
}

export { AuditRecord as A, Builder as B, ClientDrivers as C, Document as D, SampleCacheDriver as E, ParticipantAuthorizationManager as F, SurveyAuthorizationManager as G, errorMessage as H, InterviewSaveOptions as I, UaskClientError as J, KpiGenericDriver as K, LoggingProxy as L, handleClientError as M, generateDSL as N, isInterviewItemTarget as O, ParticipantGetOptions as P, isInterviewTarget as Q, isParticipantTarget as R, SummaryGenericDriver as S, UaskError as U, __awaiter as _, AuditTrail as a, ParticipantSummary as b, surveySerialize as c, clone as d, workflowDeserialize as e, pageSerialize as f, getAllTags as g, pageSetDeserialize as h, pageSetSerialize as i, itemDeserialize as j, itemSerialize as k, librarySerialize as l, ruleDeserialize as m, crossRuleSerialize as n, crossRuleDeserialize as o, pageDeserialize as p, participantSerialize as q, ruleSerialize as r, surveyDeserialize as s, participantDeserialize as t, interviewSerialize as u, interviewDeserialize as v, workflowSerialize as w, interviewItemSerialize as x, interviewItemDeserialize as y, pick as z };
