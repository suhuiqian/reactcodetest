import React from "react";

const ImportantMattersContent: React.FC = () => (
  <div className="pdf-content">
    <div className="title relative flex justify-center items-start">
      <span>重要事項等のご説明</span>
      <span className="text-xs font-normal absolute top-0 right-0">
        (サンプルデータ)
      </span>
    </div>

    <div className="text">
      重要事項（契約概要・注意喚起情報）、ご契約しおり・約款について
    </div>

    <div className="text">
      お申込みいただく保険商品の「重要事項（契約概要・注意喚起情報）」について
      全てのページの内容を十分にご確認ください。
    </div>

    <div className="subtitle">【契約概要】</div>
    <div className="list-item">• 保険種類: 終身保険</div>
    <div className="list-item">• 死亡保険金: 1,000万円</div>
    <div className="list-item">• 医療特約: 入院給付金日額5,000円</div>
    <div className="list-item">• 介護特約: 要介護状態保険金500万円</div>
    <div className="list-item">• 保険期間: 終身</div>

    <div className="subtitle">【注意喚起情報】</div>
    <div className="list-item">• 保険料の支払い義務について</div>
    <div className="list-item">• 告知義務について</div>
    <div className="list-item">• 解約について</div>
    <div className="list-item">• 保険金の支払いについて</div>

    <div className="subtitle">【ご契約しおり】</div>
    <div className="list-item">• 保険契約の基本的な仕組み</div>
    <div className="list-item">• 保障内容の詳細</div>
    <div className="list-item">• 保険料の計算方法</div>
    <div className="list-item">• 解約返戻金について</div>

    <div className="subtitle">【約款】</div>
    <div className="list-item">• 保険契約の条件</div>
    <div className="list-item">• 免責事項</div>
    <div className="list-item">• 保険金の支払い条件</div>
    <div className="list-item">• その他の重要条項</div>
  </div>
);

export default ImportantMattersContent;
