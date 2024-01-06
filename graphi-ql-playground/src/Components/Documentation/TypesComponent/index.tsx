import { FC, useCallback, useState } from 'react';
import { IntrospectionType } from 'graphql';
import clsx from 'clsx';

import { OBJECT_TYPE_KIND_NAME } from '@/constants';

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

  const handleTypeClick = useCallback(
    (type: IntrospectionType, index: number) => () => {
      if (
        type.description ||
        (type.kind === OBJECT_TYPE_KIND_NAME && type.fields)
      ) {
        updateValue(index);
      }
    },
    [updateValue]
  );

  return (
    types && (
      <div className={styles.docs__types}>
        {types.map((type, index) => (
          <div key={type.name}>
            <span>
              <button
                className={styles.docs__type}
                onClick={handleTypeClick(type, index)}
              >
                {type.name}
              </button>
              {type.description ||
              (type.kind === OBJECT_TYPE_KIND_NAME && type.fields) ? (
                <span
                  className={clsx(styles.docs__symbol, {
                    [styles.hidden]: openType[index],
                  })}
                >
                  {' '}
                  ▼
                </span>
              ) : null}
            </span>

            {openType[index] && (
              <div className={styles.docs__nested}>
                {type.description && <div>{type.description}</div>}
                {type.kind === OBJECT_TYPE_KIND_NAME && type.fields && (
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
