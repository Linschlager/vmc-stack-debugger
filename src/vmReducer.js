import {
  ADD_INT,
  ALLOC_BLOCK,
  CALL,
  COND_JUMP,
  DEREF,
  DIV_T_INT,
  DUP,
  EQ_INT,
  GE_INT,
  GT_INT,
  INPUT_BOOL,
  INPUT_INT,
  LE_INT,
  LOAD_ADDR_REL,
  LOAD_IM_INT,
  LT_INT,
  MOD_T_INT,
  MULT_INT,
  NEG_INT,
  NE_INT,
  OUTPUT_BOOL,
  OUTPUT_INT,
  RETURN,
  STOP,
  STORE,
  STORE_REV,
  SUB_INT,
  UNCOND_JUMP
} from "./vmReducer.consts";

const vmReducer = (state, action) => {
  const { ep, sp, fp, pc, store } = state;
  switch (action.type) {
    case STOP:
      return {
        ...state,
        pc: -1
      };
    case DUP:
      const dup_newStore = {
        ...store,
        [sp]: store[sp - 1]
      };
      return {
        ...state,
        sp: sp + 1,
        pc: pc + 1,
        store: dup_newStore
      };
    case ALLOC_BLOCK:
      return {
        ...state,
        sp: sp + action.payload.size,
        pc: pc + 1
      };
    case CALL:
      const call_newStore = {
        ...store,
        [sp]: fp,
        [sp + 1]: ep,
        [sp + 2]: pc
      };
      return {
        ...state,
        store: call_newStore,
        fp: sp,
        sp: sp + 3,
        pc: action.payload.routAddress
      };
    case RETURN:
      return {
        ...state,
        sp: fp - action.payload.size,
        pc: store[fp + 2] + 1,
        ep: store[fp + 1],
        fp: store[fp]
      };
    case LOAD_IM_INT:
      const loadImInt_newStore = {
        ...store,
        [sp]: action.payload.value
      };
      return {
        ...state,
        sp: sp + 1,
        pc: pc + 1,
        store: loadImInt_newStore
      };
    case LOAD_ADDR_REL:
      const loadAddrRel_newStore = {
        ...store,
        [sp]: fp + action.payload.relAddress
      };
      return {
        ...state,
        sp: sp + 1,
        pc: pc + 1,
        store: loadAddrRel_newStore
      };
    case DEREF:
      const deref_newStore = {
        ...store,
        [sp - 1]: store[store[sp - 1]]
      };
      return {
        ...state,
        pc: pc + 1,
        store: deref_newStore
      };
    case STORE:
      const store_newStore = {
        ...store,
        [store[store[sp - 2]]]: store[sp - 1]
      };
      return {
        ...state,
        sp: sp - 2,
        pc: pc + 1,
        store: store_newStore
      };
    case STORE_REV:
      const storeRev_newStore = {
        ...store,
        [store[sp - 1]]: store[sp - 2]
      };
      return {
        ...state,
        sp: sp - 2,
        pc: pc + 1,
        store: storeRev_newStore
      };
    case NEG_INT:
      const negInt_newStore = {
        ...store,
        [sp - 1]: -store[sp - 1]
      };
      return {
        ...state,
        pc: pc + 1,
        store: negInt_newStore
      };
    case ADD_INT:
      const addInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] + store[sp - 1]
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: addInt_newStore
      };
    case SUB_INT:
      const subInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] - store[sp - 1]
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: subInt_newStore
      };
    case MULT_INT:
      const multInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] * store[sp - 1]
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: multInt_newStore
      };
    case DIV_T_INT:
      const divTInt_newStore = {
        ...store,
        [sp - 2]: Math.trunc(store[sp - 2] / store[sp - 1])
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: divTInt_newStore
      };
    case MOD_T_INT:
      const modTInt_newStore = {
        ...store,
        [sp - 2]: Math.trunc(store[sp - 2] % store[sp - 1])
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: modTInt_newStore
      };
    case EQ_INT:
      const eqInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] === store[sp - 1] ? 1 : 0
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: eqInt_newStore
      };
    case NE_INT:
      const neInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] !== store[sp - 1] ? 1 : 0
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: neInt_newStore
      };
    case GT_INT:
      const gtInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] > store[sp - 1] ? 1 : 0
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: gtInt_newStore
      };
    case LT_INT:
      const ltInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] > store[sp - 1] ? 1 : 0
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: ltInt_newStore
      };
    case GE_INT:
      const geInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] >= store[sp - 1] ? 1 : 0
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: geInt_newStore
      };
    case LE_INT:
      const leInt_newStore = {
        ...store,
        [sp - 2]: store[sp - 2] <= store[sp - 1] ? 1 : 0
      };
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1,
        store: leInt_newStore
      };
    case UNCOND_JUMP:
      return {
        ...state,
        pc: action.payload.jumpAddr
      };
    case COND_JUMP:
      const newPc = store[sp - 1] !== 0 ? pc + 1 : action.payload.jumpAddr;
      return {
        ...state,
        sp: sp - 1,
        pc: newPc
      };
    case INPUT_BOOL:
      const inputBool_newStore = {
        ...store,
        [store[sp - 1]]: action.payload.input ? 1 : 0
      };
      return {
        ...state,
        sp: sp - 1,
        pc: pc + 1,
        store: inputBool_newStore
      };
    case INPUT_INT:
      const inputInt_newStore = {
        ...store,
        [store[sp - 1]]: action.payload.input
      };
      return {
        ...state,
        sp: sp - 1,
        pc: pc + 1,
        store: inputInt_newStore
      };
    case OUTPUT_BOOL:
      console.log(store[sp - 1] !== 0);
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1
      };
    case OUTPUT_INT:
      console.log(store[sp - 1]);
      return {
        ...state,
        pc: pc + 1,
        sp: sp - 1
      };
    default:
      return state;
  }
};

export default vmReducer;
