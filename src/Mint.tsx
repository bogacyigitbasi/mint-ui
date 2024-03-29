import { detectConcordiumProvider, SmartContractParameters } from "@concordium/browser-wallet-api-helpers";
import {
      AccountTransactionType,
      CcdAmount,
      serializeUpdateContractParameters,
      UpdateContractPayload,
} from "@concordium/web-sdk";
import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { Buffer } from "buffer/";

export default function Mint() {
      let [state, setState] = useState({
            checking: false,
            error: "",
            hash: "",
      });

      const submit = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setState({ ...state, error: "", checking: true, hash: "" });
            const formData = new FormData(event.currentTarget);

            var formValues = {
                  index: BigInt(formData.get("contractIndex")?.toString() || "-1"),
                  subindex: BigInt(formData.get("contractSubindex")?.toString() || "-1"),
                  metadataUrl: formData.get("metadataUrl")?.toString() || "",
                  tokenId: formData.get("tokenId")?.toString() || "",
                  quantity: parseInt(formData.get("quantity")?.toString() || "-1"),
            };

            if (!(formValues.index >= 0)) {
                  setState({ ...state, error: "Invalid Contract Index" });
                  return;
            }

            if (!(formValues.subindex >= 0)) {
                  setState({ ...state, error: "Invalid Contract Subindex" });
                  return;
            }

            if (!(formValues.quantity >= 0)) {
                  setState({ ...state, error: "Invalid Quantity" });
                  return;
            }

            if (!formValues.metadataUrl) {
                  setState({ ...state, error: "Invalid Metadata Url" });
                  return;
            }

            if (!formValues.tokenId) {
                  setState({ ...state, error: "Invalid Token Id" });
                  return;
            }

            const provider = await detectConcordiumProvider();
            const account = await provider.connect();

            if (!account) {
                  alert("Please connect");
            }

            const address = { index: formValues.index, subindex: formValues.subindex };
            const paramJson = {
                  owner: {
                        Account: [account],
                  },
                  tokens: [
                        [
                              formValues.tokenId,
                              [
                                    {
                                          url: formValues.metadataUrl,
                                          hash: "",
                                    },
                                    formValues.quantity.toString(),
                              ],
                        ],
                  ],
            };

            var REACT_APP_CONTRACT_NAME = "CIS2-Multi";
            var REACT_APP_CONTRACT_SCHEMA = "FFFF02010000000A000000434953322D4D756C7469000A0000000900000062616C616E63654F6606100114000200000008000000746F6B656E5F69641D0007000000616464726573731502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C10011B2500000015040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F7202040000006D696E7404140002000000050000006F776E65721502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C06000000746F6B656E7312021D000F1400020000000300000075726C1601040000006861736816011B2500000015040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F72020F0000006F6E526563656976696E67434953320315040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F72020A0000006F70657261746F724F66061001140002000000050000006F776E65721502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C07000000616464726573731502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C10010115040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F72020F000000736574496D706C656D656E746F72730414000200000002000000696416000C000000696D706C656D656E746F727310020C15040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F720208000000737570706F727473061001160010011503000000090000004E6F537570706F72740207000000537570706F72740209000000537570706F72744279010100000010000C15040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F72020D000000746F6B656E4D657461646174610610011D0010011400020000000300000075726C160104000000686173681502000000040000004E6F6E650204000000536F6D65010100000013200000000215040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F7202080000007472616E7366657204100114000500000008000000746F6B656E5F69641D0006000000616D6F756E741B250000000400000066726F6D1502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C02000000746F1502000000070000004163636F756E7401010000000B08000000436F6E747261637401020000000C160104000000646174611D0115040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F72020E0000007570646174654F70657261746F720410011400020000000600000075706461746515020000000600000052656D6F7665020300000041646402080000006F70657261746F721502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C15040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015060000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C790213000000496E766F6B65436F6E74726163744572726F720204000000766965770114000200000005000000737461746510020F1502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C1400020000000800000062616C616E63657310020F1D001B25000000090000006F70657261746F727310021502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C06000000746F6B656E7310021D00";

            try {
                  const schemaBuffer = Buffer.from(
                        REACT_APP_CONTRACT_SCHEMA!,
                        "hex"
                  );
                  const serializedParams = serializeUpdateContractParameters(
                        REACT_APP_CONTRACT_NAME!,
                        "mint",
                        paramJson,
                        schemaBuffer
                  );
                  const txnHash = await provider.sendTransaction(
                        account!,
                        AccountTransactionType.Update as any,
                        {
                              address,
                              message: serializedParams,
                              receiveName: `${REACT_APP_CONTRACT_NAME!}.mint`,
                              amount: new CcdAmount(BigInt(0)),
                              maxContractExecutionEnergy: BigInt(9999),
                        } as UpdateContractPayload,
                        paramJson as SmartContractParameters,
                        schemaBuffer.toString("base64")
                  );

                  setState({ checking: false, error: "", hash: txnHash });
            } catch (error: any) {
                  setState({ checking: false, error: error.message || error, hash: "" });
            }
      };

      return (
            <Stack
                  component={"form"}
                  spacing={2}
                  onSubmit={submit}
                  autoComplete={"true"}
            >
                  <TextField
                        id="contract-index"
                        name="contractIndex"
                        label="Contract Index"
                        variant="standard"
                        type={"number"}
                        disabled={state.checking}
                  />
                  <TextField
                        id="contract-subindex"
                        name="contractSubindex"
                        label="Contract Sub Index"
                        variant="standard"
                        type={"number"}
                        disabled={state.checking}
                        value={0}
                  />
                  <TextField
                        id="metadata-url"
                        name="metadataUrl"
                        label="Metadata Url"
                        variant="standard"
                        disabled={state.checking}
                  />
                  <TextField
                        id="token-id"
                        name="tokenId"
                        label="Token Id"
                        variant="standard"
                        disabled={state.checking}
                        defaultValue="01"
                  />
                  <TextField
                        id="quantity"
                        name="quantity"
                        label="Token Quantity"
                        variant="standard"
                        type="number"
                        disabled={state.checking}
                        defaultValue="1"
                  />
                  {state.error && (
                        <Typography component="div" color="error">
                              {state.error}
                        </Typography>
                  )}
                  {state.checking && <Typography component="div">Checking..</Typography>}
                  {state.hash && (
                        <Link
                              href={`https://dashboard.testnet.concordium.com/lookup/${state.hash}`}
                              target="_blank"
                        >
                              View Transaction <br />
                              {state.hash}
                        </Link>
                  )}
                  <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={state.checking}
                  >
                        Mint
                  </Button>
            </Stack>
      );
}