export interface QuestionHead {
    id: number;
    type: "nomarl" | "precautions";
    content: string;
}

export interface QuestionGroup {
    id: number;
    type: "single" | "list";
    mainQuestion: {
        questionHead: QuestionHead[];
        questionList: Question[];
        questionListHead?: string;
        answer: boolean | null;
        disqualifyingAnswer: boolean;
    };
}

export interface Question {
    questionTitle: string;
    questionContent: string | null;
    answer: boolean | null;
    isNeedReferenceMark?: boolean;
}

export const DISCLOSURE_CONTENT_QUE: QuestionGroup[] = [
    {
        id: 1,
        type: "single",
        mainQuestion: {
            questionHead: [{ id: 1, type: "nomarl", content: "現在、入院中、または、入院する予定がありますか", },
            { id: 2, type: "nomarl", content: "（「入院」には検査入院を含みます）", }
            ],
            questionList: [],
            answer: null,
            disqualifyingAnswer: true,
        },
    },
    {
        id: 2,
        type: "list",
        mainQuestion: {
            questionHead: [
                { id: 1, type: "nomarl", content: "現在、下記に該当する事項がありますか", },
                { id: 2, type: "precautions", content: "※該当する事項をチェックしてください", },
                { id: 3, type: "precautions", content: "※いずれか一つでも該当する場合は謝絶となります", }
            ],
            questionList: [
                {
                    questionTitle: "視力の障害(矯正しても左右いずれかの視力が0.3以下)がある",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "聴力・言語・そしゃく機能の障害がある",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "手・足・指・背骨(脊柱)・関節に、欠損・変形・障害がある",
                    questionContent: "人工骨頭・人工関節を挿入している場合も該当します。",
                    answer: null,
                    isNeedReferenceMark: true,
                },
                {
                    questionTitle: "身体障害者手帳の交付をうけたことがある、または交付の申請中である",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "公的介護保険制度の要介護・要支援の認定をうけたことがある、または認定申請中である",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "認知症・軽度認知障がい(MCI)、またはそれらの疑いで医師の診察・検査をうけたことがある",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "アルコール依存症・うつ病など精神疾患の診断をうけたことがある",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "国指定の難病に罹患している",
                    questionContent: null,
                    answer: null,
                },
            ],
            answer: null,
            disqualifyingAnswer: true,
        },
    },
    {
        id: 3,
        type: "list",
        mainQuestion: {
            questionHead: [
                { id: 1, type: "nomarl", content: "今までに、以下に該当する事項を医師により診断された事がありますか", },
                { id: 2, type: "precautions", content: "※該当する事項をチェックしてください", },
                { id: 3, type: "precautions", content: "※いずれか一つでも該当する場合は謝絶となります", }
            ],
            questionList: [
                {
                    questionTitle: "悪性新生物",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "上皮内新生物",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "心臓の病気",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "脳の病気",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "糖尿病",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "膵臓の病気",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "リウマチ",
                    questionContent: null,
                    answer: null,
                },
            ],
            answer: null,
            disqualifyingAnswer: true,
        },
    },
    {
        id: 4,
        type: "list",
        mainQuestion: {
            questionHead: [
                { id: 1, type: "nomarl", content: "今までに、以下に該当する事項を医師により診断された事がありますか", },
                { id: 2, type: "precautions", content: "※該当する事項をチェックしてください", },
                { id: 3, type: "precautions", content: "※いずれか一つでも該当する場合は謝絶となります", }
            ],
            questionListHead: "高血圧性の病気",
            questionList: [
                {
                    questionTitle: "高血圧性網膜症",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "高血圧性心疾患",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "高血圧性心不全",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "高血圧性腎疾患",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "高血圧性腎症",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "高血圧性腎不全",
                    questionContent: null,
                    answer: null,
                },
                {
                    questionTitle: "高血圧性心腎疾患",
                    questionContent: null,
                    answer: null,
                },
            ],
            answer: null,
            disqualifyingAnswer: true,
        },
    },
    {
        id: 5,
        type: "list",
        mainQuestion: {
            questionHead: [
                { id: 1, type: "nomarl", content: "今までに、以下に該当する事項を医師により診断された事がありますか", },
                { id: 2, type: "precautions", content: "※該当する事項をチェックしてください", },
                { id: 3, type: "precautions", content: "※いずれか一つでも該当する場合は謝絶となります", }
            ],
            questionListHead: "腎臓の病気",
            questionList: [
                { questionTitle: "腎不全", questionContent: null, answer: null },
                { questionTitle: "ＩｇＡ腎症", questionContent: null, answer: null },
                { questionTitle: "腎炎", questionContent: null, answer: null },
                { questionTitle: "腎硬化症", questionContent: null, answer: null },
                { questionTitle: "ネフローゼ症候群", questionContent: null, answer: null },
                { questionTitle: "慢性腎臓病〔ＣＫＤ〕", questionContent: null, answer: null },
                { questionTitle: "遺伝性腎症", questionContent: null, answer: null },
                { questionTitle: "糸球体障害", questionContent: null, answer: null },
                { questionTitle: "腎尿細管間質性障害", questionContent: null, answer: null },
                { questionTitle: "萎縮腎", questionContent: null, answer: null },
                { questionTitle: "矮小腎", questionContent: null, answer: null },
                { questionTitle: "腎虚血", questionContent: null, answer: null },
                { questionTitle: "腎梗塞", questionContent: null, answer: null },
                { questionTitle: "嚢胞腎", questionContent: null, answer: null },
                { questionTitle: "腎動脈硬化症", questionContent: null, answer: null },
                { questionTitle: "動脈硬化性腎炎", questionContent: null, answer: null },
            ],
            answer: null,
            disqualifyingAnswer: true,
        },
    },
    {
        id: 6,
        type: "list",
        mainQuestion: {
            questionHead: [
                { id: 1, type: "nomarl", content: "今までに、以下に該当する事項を医師により診断された事がありますか", },
                { id: 2, type: "precautions", content: "※該当する事項をチェックしてください", },
                { id: 3, type: "precautions", content: "※いずれか一つでも該当する場合は謝絶となります", }
            ],
            questionListHead: "肝臓の病気",
            questionList: [
                { questionTitle: "肝硬変", questionContent: null, answer: null },
                { questionTitle: "肝炎", questionContent: null, answer: null },
                { questionTitle: "肝炎ウイルスキャリア", questionContent: null, answer: null },
                { questionTitle: "肝不全", questionContent: null, answer: null },
                { questionTitle: "原発性硬化性胆管炎〔ＰＳＣ〕", questionContent: null, answer: null },
                { questionTitle: "原発性胆汁性胆管炎〔ＰＢＣ〕", questionContent: null, answer: null },
                { questionTitle: "門脈圧亢こう進症", questionContent: null, answer: null },
                { questionTitle: "門脈血栓症", questionContent: null, answer: null },
                { questionTitle: "アルコール性肝障害", questionContent: null, answer: null },
                { questionTitle: "肝機能障害", questionContent: null, answer: null },
                { questionTitle: "胆道拡張症", questionContent: null, answer: null },
                { questionTitle: "胆管拡張症", questionContent: null, answer: null },
                { questionTitle: "膵胆管合流異常", questionContent: null, answer: null }
            ],
            answer: null,
            disqualifyingAnswer: true,
        },
    },
    {
        id: 7,
        type: "list",
        mainQuestion: {
            questionHead: [
                { id: 1, type: "nomarl", content: "今までに、以下に該当する事項を医師により診断された事がありますか", },
                { id: 2, type: "precautions", content: "※該当する事項をチェックしてください", },
                { id: 3, type: "precautions", content: "※いずれか一つでも該当する場合は謝絶となります", }
            ],
            questionListHead: "血管の病気",
            questionList: [
                { questionTitle: "大動脈瘤", questionContent: null, answer: null },
                { questionTitle: "大動脈解離", questionContent: null, answer: null },
                { questionTitle: "動静脈瘻", questionContent: null, answer: null },
                { questionTitle: "静脈瘤", questionContent: null, answer: null },
                { questionTitle: "血栓性静脈炎", questionContent: null, answer: null },
                { questionTitle: "静脈血栓塞栓症", questionContent: null, answer: null }
            ],
            answer: null,
            disqualifyingAnswer: true,
        },
    },
    {
        id: 8,
        type: "list",
        mainQuestion: {
            questionHead: [
                { id: 1, type: "nomarl", content: "今までに、以下に該当する事項を医師により診断された事がありますか", },
                { id: 2, type: "precautions", content: "※該当する事項をチェックしてください", },
                { id: 3, type: "precautions", content: "※いずれか一つでも該当する場合は謝絶となります", }
            ],
            questionListHead: "呼吸器の病気",
            questionList: [
                { questionTitle: "呼吸不全", questionContent: null, answer: null },
                { questionTitle: "石綿肺〔アスベスト肺〕", questionContent: null, answer: null },
                { questionTitle: "肺線維症", questionContent: null, answer: null },
                { questionTitle: "慢性閉塞性肺疾患（COPD）", questionContent: null, answer: null },
                { questionTitle: "肺結核", questionContent: null, answer: null },
                { questionTitle: "間質性肺炎", questionContent: null, answer: null },
                { questionTitle: "喘息", questionContent: null, answer: null },
                { questionTitle: "肺気腫", questionContent: null, answer: null },
                { questionTitle: "肺MAC症", questionContent: null, answer: null },
                { questionTitle: "非結核性抗酸菌症", questionContent: null, answer: null },
                { questionTitle: "非定型抗酸菌症", questionContent: null, answer: null },
                { questionTitle: "慢性気管支炎", questionContent: null, answer: null },
                { questionTitle: "気管支拡張症", questionContent: null, answer: null }
            ],
            answer: null,
            disqualifyingAnswer: true,
        },
    },
];

export const inquiryMsg = {
    title: "お手続きできません",
    contentHead: "現在の状況では、この保険へのご加入を受け付けることができません。",
    consultationCounterHead: "お客様相談窓口",
    consultationList: [
        { title: "電話番号", content: "03-5809-8070" },
        { title: "FAX", content: "03-5809-8132" },
        { title: "受付時間", content: "9:00~17:00" },
        { title: "受付日", content: "月曜から金曜日（祝日および何末年始等の休業期間を除く）" }
    ],
    contentFoot: "ご不明な点がございましたら、お気軽にお問い合わせください。"
};