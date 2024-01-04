import { FC, useEffect, useState } from 'react';
import {
  IntrospectionObjectType,
  IntrospectionSchema,
  IntrospectionType,
} from 'graphql';

import { fetchSchema } from '@/utils/fetchGraphqlSchema';

import { Queries } from './QueryComponent/index';
import { Types } from './TypesComponent';

import styles from './Documentation.module.scss';

interface IDocumentationProps {
  endpoint: string;
  setSchemaLoaded: (newValue: boolean) => void;
  docs: boolean;
}

export const Documentation: FC<IDocumentationProps> = (props) => {
  const { endpoint, setSchemaLoaded } = props;

  const [openTypes, setOpenTypes] = useState<boolean>(false);
  const [openQueries, setOpenQueries] = useState<boolean>(false);
  const [schema, setSchema] = useState<IntrospectionSchema | null>(null);

  const queryType = schema?.types.find(({ name }) => name === 'Query');
  const mainTypes = schema?.types.filter(
    ({ name }) => name !== 'Query' && !name.startsWith('__')
  );

  const docsStyle = !props.docs ? styles.docs : styles.docs + ' ' + styles.open;

  useEffect(() => {
    (async () => {
      const fetchedSchema = await fetchSchema(endpoint);
      setSchema(fetchedSchema);
      setSchemaLoaded(true);
    })();
  }, [endpoint]);

  return (
    schema && (
      <section className={docsStyle}>
        <span>
          <button
            className={styles.docs__base}
            onClick={() => {
              setOpenTypes(!openTypes);
            }}
          >
            Types
          </button>

          {!openTypes && <span className={styles.docs__symbol}> ▼</span>}
        </span>

        {openTypes && (
          <div className={styles.docs__nested}>
            <Types types={mainTypes as ReadonlyArray<IntrospectionType>} />
          </div>
        )}
        <span>
          <button
            className={styles.docs__base}
            onClick={() => {
              setOpenQueries(!openQueries);
            }}
          >
            Query
          </button>

          {!openQueries && <span className={styles.docs__symbol}> ▼</span>}
        </span>

        {openQueries && (
          <div className={styles.docs__nested}>
            <Queries queries={queryType as IntrospectionObjectType} />
          </div>
        )}
      </section>
    )
  );
};
