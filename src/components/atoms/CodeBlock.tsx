import { EntryTypes } from '@/types';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import styles from './CodeBlock.module.css';

const TRUNCATE_LENGTH = 500;
const TRUNCATE_LINES = 10;

const getPosition = (string: string, subString: string, index: number) => {
  return string.split(subString, index).join(subString).length;
};

export default function CodeBlock({
  items,
  truncateLength,
}: {
  items: EntryTypes[];
  truncateLength?: number;
}) {
  const [pretty, setPretty] = useState<boolean>(false);

  const getTruncateNum = useCallback(() => {
    if (truncateLength) return truncateLength;
    if (pretty) return TRUNCATE_LINES;
    return TRUNCATE_LENGTH;
  }, [truncateLength, pretty]);

  const [truncateNum, setTruncateNum] = useState<number>(getTruncateNum());

  const getText = useCallback(
    () =>
      pretty
        ? JSON.stringify(items, null, `\t`).toString()
        : JSON.stringify(items).toString(),
    [items, pretty],
  );

  const [text, setText] = useState<string>(getText());
  const [delayedStyle, setDelayedStyle] = useState<CSSProperties>({
    whiteSpace: `normal`,
  });

  const getLength = useCallback(
    () => (pretty ? (text.match(/\n/g) || []).length : text.length),
    [text, pretty],
  );

  const [length, setLength] = useState<number>(getLength());

  const checkTruncated = useCallback(() => {
    return length > truncateNum;
  }, [length, truncateNum]);

  const [truncated, setTruncated] = useState<boolean>(checkTruncated());

  const getTruncatedPos = useCallback(
    () => (pretty ? getPosition(text, `\n`, truncateNum) : truncateNum),
    [text, pretty, truncateNum],
  );

  const [truncatedPos, setTruncatedPos] = useState<number>(getTruncatedPos());

  useEffect(() => {
    setTruncated(checkTruncated());
    setTruncateNum(getTruncateNum());
    setText(getText());
    setTruncatedPos(getTruncatedPos());
    setLength(getLength());
    setDelayedStyle({ whiteSpace: pretty ? `pre` : `normal` });
  }, [
    getText,
    getTruncateNum,
    getLength,
    checkTruncated,
    getTruncatedPos,
    pretty,
  ]);

  const [showingAll, setShowingAll] = useState(false);

  return (
    <>
      <div className={styles.options}>
        {truncated ? (
          <code
            className={[
              styles.toggleShowAll,
              showingAll ? styles.active : ``,
            ].join(` `)}
            onClick={() => {
              setShowingAll(!showingAll);
            }}
            role="button"
            aria-pressed={showingAll}
          >
            {showingAll
              ? `show less`
              : `show all (${length - truncateNum} more ${
                  pretty ? `lines` : `characters`
                })`}
          </code>
        ) : null}
        <code
          className={[styles.togglePretty, pretty ? styles.active : ``].join(
            ` `,
          )}
          role="button"
          aria-pressed={pretty}
          onClick={() => setPretty(!pretty)}
        >
          pretty print
        </code>
      </div>
      <code className={styles.code} style={delayedStyle}>
        {truncated && !showingAll
          ? `${text.slice(0, truncatedPos)}\n...`
          : text}
      </code>
      {truncated && showingAll ? (
        <code
          className={[styles.toggleShowAll, styles.active].join(` `)}
          onClick={() => {
            setShowingAll(!showingAll);
          }}
        >
          show less
        </code>
      ) : null}
    </>
  );
}
