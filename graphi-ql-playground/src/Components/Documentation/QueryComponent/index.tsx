import React, { FC } from 'react';
import { IntrospectionObjectType } from 'graphql';

import styles from '../Documentation.module.scss';

interface IQueriesProps {
  queries: IntrospectionObjectType;
}

export const Queries: FC<IQueriesProps> = (props) => {
  const { queries } = props;

  return (
    queries && (
      <div className={styles.docs__queries}>
        {queries.fields.map((query) => (
          <div key={query.name}>
            <div>
              <div>{query.description}</div>
              <span className={styles.docs__query}>{query.name}</span>
              <span>(</span>

              <span>
                {query.args &&
                  query.args.map((arg) => (
                    <div key={arg.name}>
                      <span className={styles.docs__args}>{arg.name}</span>:{' '}
                      {arg.defaultValue && (
                        <span>
                          {' '}
                          ={' '}
                          <span className={styles.docs__defaultValue}>
                            {arg.defaultValue}
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
