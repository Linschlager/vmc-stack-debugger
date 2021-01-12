export const copyRecordsHack = `0: AllocBlock(1)
1: AllocBlock(1)
2: LoadImInt(0)
3: InputInt("StoreExpression{name='x', init=true}")
4: LoadImInt(1)
5: InputInt("StoreExpression{name='y', init=true}")
6: AllocBlock(2)
7: LoadImInt(0)
8: Deref
9: LoadImInt(1)
10: Deref
11: Call(15)
12: OutputInt("y")
13: OutputInt("x")
14: Stop
15: LoadAddrRel(-2)
16: Deref
17: LoadAddrRel(-1)
18: Deref
19: Dup
20: Dup
21: AllocBlock(-3)
22: LoadAddrRel(-4)
23: LoadImInt(1)
24: AddInt
25: Dup
26: AllocBlock(1)
27: Store
28: AllocBlock(-1)
29: Dup
30: Dup
31: AllocBlock(-3)
32: LoadAddrRel(-4)
33: LoadImInt(0)
34: AddInt
35: Dup
36: AllocBlock(1)
37: Store
38: AllocBlock(-1)
39: Return(2)`;

export const copyRecordsRev = `0: AllocBlock(1)
1: AllocBlock(1)
2: LoadImInt(0)
3: InputInt("StoreExpression{name='x', init=true}")
4: LoadImInt(1)
5: InputInt("StoreExpression{name='y', init=true}")
6: AllocBlock(2)
7: LoadImInt(0)
8: Deref
9: LoadImInt(1)
10: Deref
11: Call(15)
12: OutputInt("y")
13: OutputInt("x")
14: Stop
15: LoadAddrRel(-2)
16: Deref
17: LoadAddrRel(-1)
18: Deref
19: LoadAddrRel(-4)
20: LoadImInt(1)
21: AddInt
22: StoreRev
23: LoadAddrRel(-4)
24: LoadImInt(0)
25: AddInt
26: StoreRev
27: Return(2)`;
