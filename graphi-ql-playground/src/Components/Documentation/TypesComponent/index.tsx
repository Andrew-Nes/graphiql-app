import { FC, useCallback, useState } from 'react';
import { IntrospectionType } from 'graphql';

import styles from '../Documentation.module.scss';

interface ITypesProps {
  types: ReadonlyArray<IntrospectionType>;
}

export const Types: FC<ITypesProps> = ({ types }) => {
  const [openType, setOpenType] = useState<boolean[]>(
    Array(types.length).fill(false)
  );

  const updateValue = useCallback((index: number) => {
    setOpenType((prevOpenType) => {
      const updatedState = [...prevOpenType];
      updatedState[index] = !prevOpenType[index];
      return updatedState;
    });
  }, []);

  return (
    types && (
      <div className={styles.docs__types}>
        {types.map((type, index) => (
          <div key={type.name}>
            <span>
              <button
                className={styles.docs__type}
                onClick={() => {
                  if (
                    type.description ||
                    (type.kind === 'OBJECT' && type.fields)
                  ) {
                    updateValue(index);
                  }
                }}
              >
                {type.name}
              </button>
              {(type.description || (type.kind === 'OBJECT' && type.fields)) &&
              !openType[index] ? (
                <span className={styles.docs__symbol}> ▼</span>
              ) : null}
            </span>

            {openType[index] && (
              <div className={styles.docs__nested}>
                {type.description && <div>{type.description}</div>}
                {type.kind === 'OBJECT' && type.fields && (
                  <div>
                    <span>Fields:</span>
                    {type.fields.map(({ name, description }) => {
                      return (
                        <div key={name}>
                          <span className={styles.docs__field_name}>
                            {name}
                          </span>
                          {': '}
                          <span className={styles.docs__field_description}>
                            {description}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
};
