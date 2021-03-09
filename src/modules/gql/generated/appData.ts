/* eslint-disable */
// @ts-nocheck

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import * as Types from './types';

import { CityFragment } from './city';
import { gql } from '@apollo/client';
import { CityFragmentDoc } from './city';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AppDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AppDataQuery = { __typename?: 'Query', cities: Array<(
    { __typename?: 'City' }
    & CityFragment
  )>, companies_rating: Array<{ __typename?: 'Votes', type?: Types.Maybe<number>, target_id: number, avg: { __typename?: 'VotesAvg', voteValueAvg: number } }> };


export const AppDataDocument = gql`
    query appData {
  cities {
    ...city
  }
  companies_rating: votesByRating {
    type
    target_id
    avg {
      voteValueAvg
    }
  }
}
    ${CityFragmentDoc}`;

/**
 * __useAppDataQuery__
 *
 * To run a query within a React component, call `useAppDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppDataQuery(baseOptions?: Apollo.QueryHookOptions<AppDataQuery, AppDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppDataQuery, AppDataQueryVariables>(AppDataDocument, options);
      }
export function useAppDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppDataQuery, AppDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppDataQuery, AppDataQueryVariables>(AppDataDocument, options);
        }
export type AppDataQueryHookResult = ReturnType<typeof useAppDataQuery>;
export type AppDataLazyQueryHookResult = ReturnType<typeof useAppDataLazyQuery>;
export type AppDataQueryResult = Apollo.QueryResult<AppDataQuery, AppDataQueryVariables>;