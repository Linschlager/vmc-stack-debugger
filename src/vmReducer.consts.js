export const STOP = "STOP";
export const DUP = "DUP";
export const ALLOC_BLOCK = "ALLOC_BLOCK";
export const CALL = "CALL";
export const RETURN = "RETURN";
export const LOAD_IM_INT = "LOAD_IM_INT";
export const LOAD_ADDR_REL = "LOAD_ADDR_REL";
export const DEREF = "DEREF";
export const STORE = "STORE";
export const STORE_REV = "STORE_REV";
export const NEG_INT = "NEG_INT";
export const ADD_INT = "ADD_INT";
export const SUB_INT = "SUB_INT";
export const MULT_INT = "MULT_INT";
export const DIV_T_INT = "DIV_T_INT";
export const MOD_T_INT = "MOD_T_INT";
export const EQ_INT = "EQ_INT";
export const NE_INT = "NE_INT";
export const GT_INT = "GT_INT";
export const LT_INT = "LT_INT";
export const GE_INT = "GE_INT";
export const LE_INT = "LE_INT";
export const UNCOND_JUMP = "UNCOND_JUMP";
export const COND_JUMP = "UNCOND_JUMP";
export const INPUT_BOOL = "INPUT_BOOL";
export const INPUT_INT = "INPUT_INT";
export const OUTPUT_BOOL = "OUTPUT_BOOL";
export const OUTPUT_INT = "OUTPUT_INT";

export const mapToAction = (input, paramOpt = 64) => {
  const [type, argOpt] = input.replace(")", "").split("(");
  switch (type) {
    case "Stop":
      return { input, type: STOP };
    case "Dup":
      return { input, type: DUP };
    case "AllocBlock":
      return { input, type: ALLOC_BLOCK, payload: { size: +argOpt } };
    case "Call":
      return { input, type: CALL, payload: { routAddress: +argOpt } };
    case "Return":
      return { input, type: RETURN, payload: { size: +argOpt } };
    case "LoadImInt":
      return { input, type: LOAD_IM_INT, payload: { value: +argOpt } };
    case "LoadAddrRel":
      return { input, type: LOAD_ADDR_REL, payload: { relAddress: +argOpt } };
    case "Deref":
      return { input, type: DEREF };
    case "Store":
      return { input, type: STORE };
    case "StoreRev":
      return { input, type: STORE_REV };
    case "NegInt":
      return { input, type: NEG_INT };
    case "AddInt":
      return { input, type: ADD_INT };
    case "SubInt":
      return { input, type: SUB_INT };
    case "MultInt":
      return { input, type: MULT_INT };
    case "DivTInt":
      return { input, type: DIV_T_INT };
    case "ModTInt":
      return { input, type: MOD_T_INT };
    case "EqInt":
      return { input, type: EQ_INT };
    case "NeInt":
      return { input, type: NE_INT };
    case "GtInt":
      return { input, type: GT_INT };
    case "LtInt":
      return { input, type: LT_INT };
    case "GeInt":
      return { input, type: GE_INT };
    case "LeInt":
      return { input, type: LE_INT };
    case "UncondJump":
      return { input, type: UNCOND_JUMP, payload: { jumpAddr: +argOpt } };
    case "CondJump":
      return { input, type: COND_JUMP, payload: { jumpAddr: +argOpt } };
    case "InputBool":
      return { input, type: INPUT_BOOL, payload: { input: paramOpt } };
    case "InputInt":
      return { input, type: INPUT_INT, payload: { input: paramOpt } };
    case "OutputBool":
      return { input, type: OUTPUT_BOOL };
    case "OutputInt":
      return { input, type: OUTPUT_INT };
    default:
      throw new Error("Unsupported Type: " + type + " (" + input + ")");
  }
};
