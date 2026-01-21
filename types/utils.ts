export type MakeTupleMembersNullable<T extends any[]> = T extends [infer M, ...infer O] ? [M | undefined, ...MakeTupleMembersNullable<O>] : []

type A = MakeTupleMembersNullable<[number, string, boolean]>;