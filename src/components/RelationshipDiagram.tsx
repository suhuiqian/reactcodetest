import React, { useState } from "react";
import { User } from "lucide-react";
import styles from "./RelationshipDiagram.module.css";

interface Relationship {
  label: string;
  degree: number;
  position: string;
  isSpouse?: boolean;
}

interface Relationships {
  [key: string]: Relationship;
}

interface PersonIconProps {
  relationshipKey: string;
  color?: "blue" | "pink" | "yellow" | "green" | "light-blue";
  size?: "large" | "normal" | "small";
  onClick: (key: string) => void;
  isSelected?: boolean;
  isSpouse?: boolean;
}

const FamilyTreeSelector: React.FC = () => {
  const [selectedRelationship, setSelectedRelationship] = useState<
    string | null
  >(null);

  // Define relationships with their Japanese labels and positions
  const relationships: Relationships = {
    // 0 degree (0親等)
    self: { label: "本人", degree: 0, position: "self" },
    spouse: { label: "配偶者", degree: 0, position: "spouse", isSpouse: true },

    // 1st degree (1親等)
    myparents: { label: "本人の父母", degree: 1, position: "parent" },
    spouse_parents: { label: "配偶者の父母", degree: 1, position: "parent" },
    child: { label: "子", degree: 1, position: "child" },
    daughter: { label: "子", degree: 1, position: "child" },

    // 2nd degree (2親等)
    grandparent_paternal: {
      label: "本人の祖父母",
      degree: 2,
      position: "grandparent",
    },
    grandparent_maternal: {
      label: "配偶者の祖父母",
      degree: 2,
      position: "grandparent",
    },
    sibling: { label: "本人の兄弟姉妹", degree: 2, position: "sibling" },
    spouse_sibling: {
      label: "配偶者の兄弟姉妹",
      degree: 2,
      position: "sibling",
    },
    grandchild: { label: "孫", degree: 2, position: "grandchild" },
    child_spouse: {
      label: "配偶者",
      degree: 2,
      position: "child-spouse",
      isSpouse: true,
    },

    // 3rd degree (3親等)
    great_grandparent: {
      label: "本人の曾祖父母",
      degree: 3,
      position: "great-grandparent",
    },
    spouse_great_grandparent: {
      label: "配偶者の曾祖父母",
      degree: 3,
      position: "spouse-great-grandparent",
    },
    uncle_aunt_paternal: {
      label: "伯叔父母",
      degree: 3,
      position: "uncle-aunt",
    },
    uncle_aunt_maternal: {
      label: "伯叔父母",
      degree: 3,
      position: "uncle-aunt",
    },
    nephew_niece: { label: "甥姪", degree: 3, position: "nephew-niece" },
    great_grandchild: {
      label: "曾孫",
      degree: 3,
      position: "great-grandchild",
    },
    grandchild_spouse: {
      label: "配偶者",
      degree: 3,
      position: "grandchild-spouse",
      isSpouse: true,
    },
    great_grandchild_spouse: {
      label: "配偶者",
      degree: 3,
      position: "great-grandchild-spouse",
      isSpouse: true,
    },
    uncle_aunt_spouse: {
      label: "配偶者",
      degree: 3,
      position: "uncle-aunt-spouse",
      isSpouse: true,
    },
    sibling_spouse: {
      label: "配偶者",
      degree: 2,
      position: "sibling-spouse",
      isSpouse: true,
    },
    nephew_niece_spouse: {
      label: "配偶者",
      degree: 3,
      position: "nephew-niece-spouse",
      isSpouse: true,
    },

    // Spouse's relatives (3親等)
    spouse_father: {
      label: "配偶者の父母",
      degree: 3,
      position: "spouse-parent",
    },
    spouse_mother: {
      label: "配偶者の父母",
      degree: 3,
      position: "spouse-parent",
    },

    spouse_nephew_niece: {
      label: "配偶者の甥姪",
      degree: 3,
      position: "spouse-nephew-niece",
    },
    spouse_nephew_niece_spouse: {
      label: "配偶者",
      degree: 3,
      position: "spouse-nephew-niece-spouse",
      isSpouse: true,
    },
    spouse_grandparent: {
      label: "配偶者の祖父母",
      degree: 3,
      position: "spouse-grandparent",
    },
    spouse_uncle_aunt: {
      label: "配偶者の伯叔父母",
      degree: 3,
      position: "spouse-uncle-aunt",
    },
    spouse_uncle_aunt_spouse: {
      label: "配偶者",
      degree: 3,
      position: "spouse-uncle-aunt-spouse",
      isSpouse: true,
    },
  };

  const PersonIcon: React.FC<PersonIconProps> = ({
    relationshipKey,
    color = "blue",
    size = "normal",
    onClick,
    isSelected = false,
    isSpouse = false,
  }) => {
    const relationship = relationships[relationshipKey];
    const sizeClass =
      size === "large"
        ? styles.large
        : size === "small"
        ? styles.small
        : styles.normal;
    const colorClass = styles[color];
    const spouseClass = isSpouse ? styles.spouse : "";

    return (
      <div className={styles.personContainer}>
        <button
          onClick={() => onClick(relationshipKey)}
          className={`${
            styles.personIcon
          } ${sizeClass} ${colorClass} ${spouseClass} ${
            isSelected ? styles.selected : ""
          }`}
        >
          <User
            className={
              size === "large"
                ? styles.largeIcon
                : size === "small"
                ? styles.smallIcon
                : styles.normalIcon
            }
          />
        </button>
        <span className={styles.personLabel}>{relationship.label}</span>
      </div>
    );
  };

  const handlePersonClick = (relationshipKey: string): void => {
    setSelectedRelationship(relationshipKey);
  };

  const getDegreeColor = (
    degree: number
  ): "green" | "pink" | "yellow" | "light-blue" => {
    switch (degree) {
      case 1:
        return "green";
      case 2:
        return "pink";
      case 3:
        return "yellow";
      default:
        return "light-blue";
    }
  };

  return (
    <div className={styles.container}>
      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendContent}>
          <h3 className={styles.legendTitle}>
            親等の配偶者・本人の3親等内の親族
          </h3>
          <div className={styles.legendItems}>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.green}`}></div>
              <span>1親等</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.pink}`}></div>
              <span>2親等</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.yellow}`}></div>
              <span>3親等</span>
            </div>
          </div>
        </div>
      </div>

      {/* Family Tree */}
      <div className={styles.familyTree}>
        {/* Great Grandparents (3親等) 
           LEVEL 1 (TOP LEVEL from up to bottom)
        */}
        <div className={styles.generation}>
          <div className={styles.greatGrandparents}>
            <PersonIcon
              relationshipKey="spouse_great_grandparent"
              color={getDegreeColor(3)}
              onClick={handlePersonClick}
              isSelected={selectedRelationship === "spouse_great_grandparent"}
            />
            <PersonIcon
              relationshipKey="great_grandparent"
              color={getDegreeColor(3)}
              onClick={handlePersonClick}
              isSelected={selectedRelationship === "great_grandparent"}
            />
          </div>
        </div>

        {/* Grandparents (2親等) 
           LEVEL 2 (TOP LEVEL from up to bottom)
        */}
        <div className={styles.generation}>
          <div className={styles.grandparents}>
            <div className={styles.grandparentPair}>
              <PersonIcon
                relationshipKey="spouse_grandparent"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "spouse_grandparent"}
              />
              <PersonIcon
                relationshipKey="grandparent_paternal"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "grandparent_paternal"}
              />
            </div>
            {/* <div className={styles.grandparentPair}>
              <PersonIcon
                relationshipKey="grandparent_paternal"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "grandparent_paternal"}
              />
              <PersonIcon
                relationshipKey="grandparent_paternal"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
              />
            </div> */}
            {/* <div className={styles.grandparentPair}>
              <PersonIcon
                relationshipKey="grandparent_maternal"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "grandparent_maternal"}
              />
              <PersonIcon
                relationshipKey="grandparent_maternal"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
              />
            </div> */}
          </div>
        </div>

        {/* Parents & Aunts/Uncles Level 
           LEVEL 3 (TOP LEVEL from up to bottom)
        */}
        <div className={styles.generation}>
          <div className={styles.parentsLevel}>
            {/* Uncle/Aunt (3親等) */}
            <div className={styles.uncleAuntGroup}>
              <div className={styles.uncleAuntGroup}>
                <PersonIcon
                  relationshipKey="uncle_aunt_maternal"
                  color={getDegreeColor(3)}
                  onClick={handlePersonClick}
                  isSelected={selectedRelationship === "uncle_aunt_maternal"}
                />
                {/* <PersonIcon
                  relationshipKey="uncle_aunt_spouse"
                  color={getDegreeColor(3)}
                  onClick={handlePersonClick}
                  isSpouse={true}
                /> */}
              </div>
            </div>

            {/* Parents (1親等) */}
            <div className={styles.parents}>
              <PersonIcon
                relationshipKey="spouse_parents"
                color={getDegreeColor(1)}
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "spouse_parents"}
              />
              <PersonIcon
                relationshipKey="myparents"
                color={getDegreeColor(1)}
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "myparents"}
              />
            </div>

            {/* Uncle/Aunt (3親等) */}
            <PersonIcon
              relationshipKey="uncle_aunt_paternal"
              color={getDegreeColor(3)}
              onClick={handlePersonClick}
              isSelected={selectedRelationship === "uncle_aunt_paternal"}
            />
            <PersonIcon
              relationshipKey="uncle_aunt_spouse"
              color={getDegreeColor(3)}
              onClick={handlePersonClick}
              isSpouse={true}
            />
          </div>
        </div>

        {/* Self & Siblings Level 
           LEVEL 4 (TOP LEVEL from up to bottom)
        */}
        <div className={styles.generation}>
          <div className={styles.selfLevel}>
            {/* Siblings (2親等) */}
            <div className={styles.siblings}>
              <PersonIcon
                relationshipKey="spouse_sibling"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "spouse_sibling"}
              />
            </div>

            {/* Spouse */}
            <div className={styles.spouseContainer}>
              <PersonIcon
                relationshipKey="spouse"
                color="light-blue"
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "spouse"}
                isSpouse={true}
              />
            </div>

            {/* Self */}
            <div className={styles.selfContainer}>
              <PersonIcon
                relationshipKey="self"
                color="blue"
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "self"}
                isSpouse={true}
              />
            </div>

            {/* Siblings (2親等) */}
            <div className={styles.siblings}>
              <PersonIcon
                relationshipKey="sibling"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "sibling"}
              />
              <PersonIcon
                relationshipKey="sibling_spouse"
                color={getDegreeColor(2)}
                onClick={handlePersonClick}
                isSpouse={true}
              />
            </div>
          </div>
        </div>

        {/* Spouse's Relatives Level 
           LEVEL 5 (TOP LEVEL from up to bottom)
        */}
        <div className={styles.generation}>
          <div className={styles.children}>
            {/* Nephew/Niece (3親等) */}
            <PersonIcon
              relationshipKey="nephew_niece"
              color={getDegreeColor(3)}
              size="small"
              onClick={handlePersonClick}
              isSelected={selectedRelationship === "nephew_niece"}
            />
            <PersonIcon
              relationshipKey="child_spouse"
              color={getDegreeColor(1)}
              onClick={handlePersonClick}
              isSpouse={true}
            />
            <PersonIcon
              relationshipKey="child"
              color={getDegreeColor(1)}
              onClick={handlePersonClick}
              isSelected={selectedRelationship === "child"}
            />
            {/* <PersonIcon
              relationshipKey="daughter"
              color={getDegreeColor(1)}
              onClick={handlePersonClick}
              isSelected={selectedRelationship === "daughter"}
            /> */}
          </div>
          <div className={styles.spouseRelativesLevel}>
            {/* Spouse's Parents (3親等) */}
            {/* Nephew/Niece (3親等) */}

            {/* Spouse's Siblings (3親等) */}
            <div className={styles.spouseSiblings}>
              {/* <PersonIcon
                relationshipKey="spouse_sibling_spouse"
                color={getDegreeColor(3)}
                onClick={handlePersonClick}
                isSpouse={true}
              /> */}
            </div>

            {/* Spouse's Nephews/Nieces (3親等) */}
            <div className={styles.spouseNephews}>
              <PersonIcon
                relationshipKey="nephew_niece"
                color={getDegreeColor(3)}
                size="small"
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "nephew_niece"}
              />
              <PersonIcon
                relationshipKey="spouse_nephew_niece"
                color={getDegreeColor(3)}
                size="small"
                onClick={handlePersonClick}
                isSelected={selectedRelationship === "spouse_nephew_niece"}
              />
              {/*  <PersonIcon
                relationshipKey="spouse_nephew_niece_spouse"
                color={getDegreeColor(3)}
                size="small"
                onClick={handlePersonClick}
                isSpouse={true}
              /> */}
            </div>
          </div>
        </div>

        {/* Children Level (1親等) 
           LEVEL 6 (TOP LEVEL from up to bottom)
        */}
        <div className={styles.generation}>
          {" "}
          <PersonIcon
            relationshipKey="grandchild"
            color={getDegreeColor(2)}
            size="small"
            onClick={handlePersonClick}
            isSelected={selectedRelationship === "grandchild"}
          />
          {/*  <PersonIcon
              relationshipKey="grandchild"
              color={getDegreeColor(2)}
              size="small"
              onClick={handlePersonClick}
            /> */}
          <PersonIcon
            relationshipKey="grandchild_spouse"
            color={getDegreeColor(2)}
            size="small"
            onClick={handlePersonClick}
          />
        </div>

        {/* Grandchildren Level (2親等) 
           LEVEL 7 (TOP LEVEL from up to bottom)
        */}
        <div className={styles.generation}>
          <div className={styles.greatGrandchildren}>
            <PersonIcon
              relationshipKey="great_grandchild"
              color={getDegreeColor(3)}
              size="small"
              onClick={handlePersonClick}
              isSelected={selectedRelationship === "great_grandchild"}
            />
            <PersonIcon
              relationshipKey="great_grandchild_spouse"
              color={getDegreeColor(3)}
              size="small"
              onClick={handlePersonClick}
            />
          </div>
        </div>

        {/* Great Grandchildren Level (3親等) 
           LEVEL 8 (TOP LEVEL from up to bottom)
        */}
        <div className={styles.generation}></div>
      </div>

      {/* Selection Display */}
      {selectedRelationship && (
        <div className={styles.selectionDisplay}>
          <h3 className={styles.selectionTitle}>選択された続柄:</h3>
          <div className={styles.selectionContent}>
            <div
              className={`${styles.selectionDot} ${
                styles[
                  getDegreeColor(relationships[selectedRelationship].degree)
                ]
              }`}
            ></div>
            <span className={styles.selectionLabel}>
              {relationships[selectedRelationship].label}
            </span>
            <span className={styles.selectionDegree}>
              ({relationships[selectedRelationship].degree}親等)
            </span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className={styles.actionButton}>
        <button
          disabled={!selectedRelationship}
          className={`${styles.button} ${
            selectedRelationship ? styles.buttonEnabled : styles.buttonDisabled
          }`}
        >
          続柄を確定する
        </button>
      </div>
    </div>
  );
};

export default FamilyTreeSelector;
