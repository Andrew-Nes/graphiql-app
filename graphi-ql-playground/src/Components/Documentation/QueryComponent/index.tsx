import React, { FC } from 'react';
import { IntrospectionObjectType } from 'graphql';

import styles from '../Documentation.module.scss';

interface IQueriesProps {
  queries: IntrospectionObjectType;
}

export const Queries: FC<IQueriesProps> = ({ queries }) => {
  return (
    queries && (
      <div className={styles.docs__queries}>
        {queries.fields.map(({ name, description, args }) => (
          <div key={name}>
            <div>
              <div>{description}</div>
              <span className={styles.docs__query}>{name}</span>
              <span>(</span>

              <span>
                {args &&
                  args.map(({ name, defaultValue }) => (
                    <div key={name}>
                      <span className={styles.docs__args}>{name}</span>:{' '}
                      {defaultValue && (
                        <span>
                          {' '}
                          ={' '}
                          <span className={styles.docs__defaultValue}>
                            {defaultValue}
                          </span>
                        </span>
                      )}
                    </div>
                  ))}
              </span>

              <span>)</span>
            </div>
          </div>
        ))}
      </div>
    )
  );
};
