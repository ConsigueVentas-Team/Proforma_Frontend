import {
  StyleSheet,
  Document,
  View,
  Text,
  Page,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import ProformaHeader from "@/assets/proforma/proforma-header.png";
import ProformaFooter from "@/assets/proforma/proforma-footer.png";
import Ellipse1 from "@/assets/proforma/ellipse-1.png";
import Ellipse2 from "@/assets/proforma/ellipse-2.png";

interface Props {
  data: ProformaPDF;
}

export const PDF = React.memo(({ data }: Props) => {
  const counts = data?.personal_proyecto.reduce(
    (
      acc: Record<string, number>,
      curr: { position: { name: string | number } }
    ) => {
      acc[curr.position.name] = (acc[curr.position.name] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <Document>
      <Page size="A4" style={styles.Page}>
        <Image src={ProformaHeader} style={stylesImages.ImageHeader} />
        <Image
          src={Ellipse1}
          style={[stylesImages.Ellipse, stylesImages.Ellipse1]}
        />
        <Image
          src={Ellipse2}
          style={[stylesImages.Ellipse, stylesImages.Ellipse2]}
        />
        <Image
          src={Ellipse1}
          style={[stylesImages.Ellipse, stylesImages.Ellipse3]}
        />

        <View style={styles.ViewTextNumber}>
          <Text>PROFORMA {data?.invoice_number}</Text>
        </View>
        <View style={{ padding: "15px" }}>
          <View style={styles.ViewHeader}>
            <View style={[styles.ViewHeaderInfo, styles.ViewHeadEnterprise]}>
              <Text style={styles.textCell}>
                RAZÓN SOCIAL: GRUPO ONLINE CONSIGUE VENTAS E.I.R.L
              </Text>
              <Text style={styles.textCell}>RUC: 20606936606</Text>
              <Text style={styles.textCell}>TELÉFONO MÓVIL: 949914249</Text>
              <Text style={styles.textCell}>
                CORREO: atención@soyjhoelfernandez.com
              </Text>
              <Text style={styles.textCell}>
                PÁGINA WEB: soyjhoelfernandez.com
              </Text>
              <Text style={styles.textCell}>
                OFICINA: Av. Brasil 2980, oficina 302, Magdalena del Mar Lima
              </Text>
              <Text style={styles.textCell}>
                PORTAFOLIO DIGITAL: https://www.behance.net/jhoelfernandez
              </Text>
            </View>
            <View style={styles.ViewHeaderInfo}>
              <Text style={styles.textCell}>FECHA: {data?.date}</Text>
              <Text style={styles.textCell}>REFERENCIA: {data?.reference}</Text>
              <Text style={styles.textCell}>
                ELABORADO POR: {data?.prepared_by}
              </Text>
              <Text style={styles.textCell}>
                APROBADO POR: {data?.approved_by}
              </Text>
              <Text style={styles.textCell}>CORREO: {data?.email}</Text>
              <Text style={styles.textCell}>
                TELÉFONO MÓVIL: {data?.phone_number}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              fontSize: "8",
              border: "1.5px solid #000",
              borderRadius: 10,
              marginBottom: "15px",
              padding: "8px",
            }}
          >
            <View>
              <Text style={styles.textCell}>
                NOMBRE DEL PROSPECTO: {data?.required_by}
              </Text>
              <Text style={styles.textCell}>RUC: {data?.company.tax_id}</Text>
              <Text style={styles.textCell}>
                DATOS DE NEGOCIO: {data?.company.category}
              </Text>
              <Text style={styles.textCell}>
                DIRECCIÓN: {data?.company.office_address}
              </Text>
            </View>
            <View style={{ marginLeft: "5px" }}>
              <Text style={styles.textCell}>
                NOMBRE DEL NEGOCIO: {data?.company.business_name}
              </Text>
              <Text style={styles.textCell}>CORREO: {data?.company.email}</Text>
              <Text style={styles.textCell}>
                TELÉFONO: +51 {data?.company.phone_number}
              </Text>
            </View>
          </View>
          <View style={{ border: "1.5px solid #283C4C", borderRadius: 10 }}>
            <Text style={styles.textTitleBorderBotton}>PRESENTACIÓN</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                fontSize: "8",
                padding: "10",
              }}
            >
              <Text style={{ textAlign: "center" }}>
                Después de haber realizado la reunión comercial y examinado las
                redes sociales de la marca "{data?.company.category}", el equipo
                de la agencia de Online JF le envía a detalle las
                características que contiene el paquete del servicio de gestión
                de redes, publicidad digital, los beneficios que te ayudarán a
                arrancar tu presencia en redes sociales.
              </Text>
            </View>
          </View>
          <View style={stylesTable.table}>
            <Text style={styles.textTitleBorderBotton}>1. CARACTERÍSTICAS</Text>
            <View style={stylesTableCharacteristics.tableRow}>
              <View style={stylesTableCharacteristics.tableCol1}>
                <Text style={stylesTableCharacteristics.tableCellTitle}>
                  AREA
                </Text>
              </View>
              <View style={stylesTableCharacteristics.tableCol2}>
                <Text style={stylesTableCharacteristics.tableCellTitle}>
                  ITEM
                </Text>
              </View>
              <View style={stylesTableCharacteristics.tableCol3}>
                <Text style={stylesTableCharacteristics.tableCellTitle}>
                  DETALLE
                </Text>
              </View>
              <View style={stylesTableCharacteristics.tableCol4}>
                <Text style={stylesTableCharacteristics.tableCellTitle}>
                  PAQUETE 1
                </Text>
              </View>
              <View style={stylesTableCharacteristics.tableCol4}>
                <Text style={stylesTableCharacteristics.tableCellTitle}>
                  PAQUETE 2
                </Text>
              </View>
              <View style={stylesTableCharacteristics.table4Background}>
                <Text style={stylesTableCharacteristics.tableCellTitle}>
                  PAQUETE 3
                </Text>
              </View>
            </View>
            {data?.areas.map((area: ProformaPDFArea, index: number) => (
              <View key={index} style={stylesTableCharacteristics.tableRow}>
                <View style={stylesTableCharacteristics.tableCol1}>
                  <Text style={stylesTableCharacteristics.tableCell}>
                    {area.name}
                  </Text>
                </View>
                <View style={stylesTableCharacteristics.tableCol2}>
                  {area.items.map((item, index) => (
                    <Text
                      key={index}
                      style={stylesTableCharacteristics.tableCell}
                    >
                      {item.item_id}
                    </Text>
                  ))}
                </View>
                <View style={stylesTableCharacteristics.tableCol3}>
                  {area.items.map((item, index) => (
                    <Text
                      key={index}
                      style={stylesTableCharacteristics.tableCell}
                    >
                      {item.detail}
                    </Text>
                  ))}
                </View>
                <View style={stylesTableCharacteristics.tableCol4}>
                  {area.items.map((item, index) => (
                    <Text
                      key={index}
                      style={stylesTableCharacteristics.tableCell}
                    >
                      {item.package_1.value}
                    </Text>
                  ))}
                </View>
                <View style={stylesTableCharacteristics.tableCol4}>
                  {area.items.map((item, index) => (
                    <Text
                      key={index}
                      style={stylesTableCharacteristics.tableCell}
                    >
                      {item.package_2.value}
                    </Text>
                  ))}
                </View>
                <View style={stylesTableCharacteristics.table4Background}>
                  {area.items.map((item, index) => (
                    <Text
                      key={index}
                      style={stylesTableCharacteristics.tableCell}
                    >
                      {item.package_3.value}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
            <View
              style={{
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  fontSize: "8px",
                  paddingRight: "20px",
                }}
              >
                RECOMENDADO
              </Text>
            </View>
          </View>
          <View style={stylesTable.table}>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={styles.textTitleBackground}>
                  2. DETALLE DEL SERVICIO
                </Text>
              </View>
            </View>
            {data?.areas.map((area: ProformaPDFArea, index: number) => (
              <View key={index} style={stylesTable.tableRow}>
                <View
                  style={[
                    stylesTable.tableCol,
                    index === data?.areas.length - 1 ? { borderBottom: 0 } : {},
                  ]}
                >
                  <View style={styles.textSubTitleBackground}>
                    <Text style={stylesTable.tableText}>
                      {area.area_id}. {area.name}
                    </Text>
                  </View>
                  {area.items.map((item, index) => (
                    <View key={index} style={stylesTable.tableCell}>
                      <View>
                        <Text
                          style={stylesTableDetailService.tableCellSubTitle}
                        >
                          {area.area_id}.{item.item_id} {item.detail}
                        </Text>
                        <Text style={stylesTableDetailService.tableCell}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View style={stylesTable.table}>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={styles.textTitleBackground}>3. PRECIO</Text>
              </View>
            </View>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={stylesTable.tableCellPrecing}>
                  {`${data?.packages[0] ? data.packages[0].note_price : ""}`}{" "}
                  PAQUETE 1
                </Text>
                <Text style={stylesTable.tableCellPrecing}>
                  {`${data?.packages[1] ? data.packages[1].note_price : ""}`}{" "}
                  PAQUETE 2
                </Text>
                <Text style={stylesTable.tableCellPrecing}>
                  {`${data?.packages[2] ? data.packages[2].note_price : ""}`}{" "}
                  PAQUETE 3
                </Text>
              </View>
              <View style={[stylesTable.ColTablePrecing, { borderRight: 0 }]}>
                <Text style={stylesTable.tableCellPrecingRight}>{`s/ ${
                  data?.packages[0]
                    ? data?.igv
                      ? (Number(data.packages[0].price) * 1.18).toFixed(2)
                      : data.packages[0].price
                    : "000.00"
                }`}</Text>
                <Text style={stylesTable.tableCellPrecingRight}>{`s/ ${
                  data?.packages[1]
                    ? data?.igv
                      ? (Number(data.packages[1].price) * 1.18).toFixed(2)
                      : data.packages[1].price
                    : "000.00"
                }`}</Text>
                <Text style={stylesTable.tableCellPrecingRight}>{`s/ ${
                  data?.packages[2]
                    ? data?.igv
                      ? (Number(data.packages[2].price) * 1.18).toFixed(2)
                      : data.packages[2].price
                    : "000.00"
                }`}</Text>
              </View>
            </View>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={stylesTable.tableCell}>
                  {!data?.igv
                    ? "NOTA: El monto mencionado no incluye IGV."
                    : "NOTA: El monto mencionado incluye IGV."}
                </Text>
                <Text style={stylesTable.tableCell}>
                  {!data?.igv
                    ? "* Si desea factura o boleta solicitar al área contable para la entrega adicionando el IGV y si no lo desea se emitirá un RXH por el servicio solicitado"
                    : ""}
                </Text>
                <Text style={stylesTable.tableCell}>
                  * El monto cotizado está basado de manera mensual
                </Text>
                <Text style={stylesTable.tableCell}>
                  * La agencia asume el transporte de sus colaboradores y
                  equipos a utilizar
                </Text>

                {/* {
                                    data?.packages.map((item, index) => (
                                        <Text key={index} style={stylesTable.tableCell}>{item.note_price}</Text>
                                    ))
                                } */}
              </View>
            </View>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={stylesTable.tableCell}>
                  INVERSIÓN PARA LAS CAMPAÑAS DE PAGO: EL PRESUPUESTO POR DÍA
                  SEGÚN LA RED SOCIAL
                </Text>
              </View>
            </View>
            <View style={stylesTable.tableRow}>
              <View style={[stylesTable.tableCol, { borderBottom: "none" }]}>
                <Text style={stylesTable.tableCellPrecing}>
                  Inversión en publicidad en Facebook e Ig minimo 7 dias a costo
                  de 30 a 50 por dia
                </Text>
                <Text style={stylesTable.tableCellPrecing}>
                  TikTok el monto mínimo son 50 soles por dia, la cual la
                  plataforma te pide minimo 10 dias
                </Text>
                <Text style={stylesTable.tableCellPrecing}>
                  Googles ads la recomendacion seria el monto mínimo 50 soles
                  por dia minimo 7 dias
                </Text>
              </View>
              <View
                style={[
                  stylesTable.ColTablePrecing,
                  { borderBottom: "none", borderRight: "none" },
                ]}
              >
                <Text style={stylesTable.tableCellPrecingRight}>{`s/ ${
                  data?.packages[0]
                    ? data?.igv
                      ? (Number(data.packages[0].price) * 1.18).toFixed(2)
                      : data.packages[0].price
                    : "000.00"
                }`}</Text>
                <Text style={stylesTable.tableCellPrecingRight}>{`s/ ${
                  data?.packages[1]
                    ? data?.igv
                      ? (Number(data.packages[1].price) * 1.18).toFixed(2)
                      : data.packages[1].price
                    : "000.00"
                }`}</Text>
                <Text style={stylesTable.tableCellPrecingRight}>{`s/ ${
                  data?.packages[2]
                    ? data?.igv
                      ? (Number(data.packages[2].price) * 1.18).toFixed(2)
                      : data.packages[2].price
                    : "000.00"
                }`}</Text>
              </View>
            </View>
          </View>
          <View style={stylesTable.table}>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={styles.textTitleBackground}>
                  6. PERSONAL DEL PROYECTO
                </Text>
              </View>
            </View>
            {data?.personal_proyecto.map(
              (item: ProformaPDFPersonal, index: number) => (
                <View key={index} style={stylesTable.tableRow}>
                  <View
                    style={[
                      stylesTable.tableCol,
                      { borderBottom: 0, margin: 4 },
                    ]}
                  >
                    <Text style={stylesTable.tableCell}>
                      {`${counts[item.position.name]} ${item.position.name}`}
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>
          <View style={stylesTable.table}>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={styles.textTitleBackground}>
                  7. TIEMPO DE TRABAJO
                </Text>
              </View>
            </View>
            <View style={stylesTable.tableRow}>
              <View
                style={[stylesTable.tableCol, { borderBottom: 0, margin: 4 }]}
              >
                <Text style={stylesTable.tableCell}>{data?.work_time}</Text>
              </View>
            </View>
          </View>
          <View style={stylesTable.table}>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={styles.textTitleBackground}>8. OBSERVACIONES</Text>
              </View>
            </View>
            {data?.observations.map(
              (item: ProformaPDFObservation, index: number) => (
                <View key={index} style={stylesTable.tableRow}>
                  <View
                    style={[
                      stylesTable.tableCol,
                      { borderBottom: 0, margin: 4 },
                    ]}
                  >
                    <Text style={stylesTable.tableCell}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>
          <View style={stylesTable.table}>
            <View style={stylesTable.tableRow}>
              <View style={stylesTable.tableCol}>
                <Text style={styles.textTitleBackground}>
                  9. CONDICIONES DE PAGO
                </Text>
              </View>
            </View>
            <View style={stylesTable.tableRow}>
              <View
                style={[stylesTable.tableCol, { borderBottom: 0, margin: 4 }]}
              >
                <Text style={stylesTable.tableCell}>
                  **FORMA DE PAGO: PARA COMENZAR EL PROYECTO SE PAGARÁ EL 50% DE
                  INICIAR Y 50% A LOS 20 DÍAS DE LAS PRIMERA REUNIÓN VIRTUAL CON
                  LA MARCA
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.ViewFooter}>
            <View style={styles.ViewItemDisplayFlex}>
              <Text style={styles.TextCenter}>DEPÓSITO BCP SOLES</Text>
              <View style={styles.TextDetailItem}>
                <Text style={styles.textCell}>
                  A NOMBRE: JHOEL FERNANDEZ ALVARADO
                </Text>
                <Text style={styles.textCell}>Cuenta: 193-37963785-0-55</Text>
                <Text style={styles.textCell}>
                  Cuenta Interbancaria CCI: 00219313796378505510
                </Text>
              </View>

              <Text style={styles.TextCenter}>
                CUENTA EMPRESARIAL EN SOLES INTERBANK
              </Text>
              <View style={styles.TextDetailItem}>
                <Text style={styles.textCell}>
                  A NOMBRE: JHOEL FERNANDEZ ALVARADO
                </Text>
                <Text style={styles.textCell}>Cuenta: 8983339398889</Text>
                <Text style={styles.textCell}>
                  Cuenta Interbancaria CCI: 00389801333939888943
                </Text>
              </View>
            </View>
            <View style={styles.ViewItemDisplayFlex}>
              <Text style={styles.TextCenter}>
                DEPÓSITO O TRANSFERENCIA BBVA EN SOLES
              </Text>
              <View style={styles.TextDetailItem}>
                <Text style={styles.textCell}>
                  A NOMBRE: JHOEL FERNANDEZ ALVARADO
                </Text>
                <Text style={styles.textCell}>
                  Cuenta: 0011-0814-0210802148-12
                </Text>
                <Text style={styles.textCell}>
                  Cuenta Interbancaria CCI: 0011-814-000210802148-12
                </Text>
              </View>
              <Text style={styles.TextCenter}>NÚMERO PARA PAGO CON YAPE</Text>
              <View style={styles.TextDetailItem}>
                <Text style={styles.textCell}>
                  A NOMBRE: JHOEL FERNANDEZ ALVARADO
                </Text>
                <Text style={styles.textCell}>Número: 949914249</Text>
              </View>
              <Text style={styles.textCell}>
                *Importante se debe mandar los comprobantes de pago al asesor
                comercial para confirmar el pago
              </Text>
            </View>
          </View>
        </View>
        <Image
          src={Ellipse2}
          style={[stylesImages.Ellipse, stylesImages.Ellipse8]}
        />
        <Image src={ProformaFooter} style={stylesImages.ImageFooter} />
      </Page>
    </Document>
  );
});

const stylesImages = StyleSheet.create({
  ImageHeader: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "50%",
    height: "auto",
    marginTop: 0,
    marginLeft: 0,
  },
  ImageFooter: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    right: "0px",
    height: "auto",
  },
  Ellipse: {
    position: "absolute",
    width: "70px",
  },
  Ellipse1: {
    top: "130px",
    left: "-35px",
    width: "70px",
  },
  Ellipse2: {
    top: "30%",
    right: "-30px",
    width: "70px",
  },
  Ellipse3: {
    top: "50%",
    left: "-35px",
    width: "70px",
  },
  Ellipse8: {
    bottom: "130px",
    right: "-20px",
    width: "70px",
  },
});

const styles = StyleSheet.create({
  Document: {},
  Page: {
    padding: "20px",
  },
  ViewHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 8,
    marginBottom: "15px",
    marginTop: "100px",
  },
  ViewHeaderInfo: {
    border: "1.5px solid #283C4C",
    borderRadius: 10,
    padding: 5,
    width: "48%",
  },
  ViewHeadEnterprise: {
    width: "70%",
    border: "none",
  },
  ViewTextNumber: {
    position: "absolute",
    top: "100px",
    right: "0px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "45%",
    height: "30px",
    justifyContent: "flex-start",
    fontSize: "14px",
    fontWeight: "semibold",
    paddingLeft: "15px",
    backgroundColor: "#283C4C",
    color: "#DAFC4A",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  textCell: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 8,
    fontWeight: "light",
  },
  textTitleBorderBotton: {
    backgroundColor: "#DADADA",
    borderBottom: "1.5px solid #283C4C",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 2,
    fontSize: 9,
  },
  textSubTitleBackground: {
    backgroundColor: "#e8fd8e",
    width: "100%",
  },
  textTitleBackground: {
    backgroundColor: "#DADADA",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 2,
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    fontSize: 9,
  },
  ViewFooter: {
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexDirection: "row",
    fontSize: 8,
    border: "1.5px solid #283C4C",
    borderRadius: 10,
    marginTop: "15px",
    marginBottom: "15px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "5px 10px",
  },
  ViewItemDisplayFlex: {
    width: "45%",
  },
  ViewTextFooter: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 8,
  },
  TextCenter: {
    textAlign: "center",
    textDecoration: "underline",
    paddingBottom: "5px",
    marginTop: "5px",
  },
  TextDetailItem: {
    width: "100%",
    fontSize: 8,
    fontWeight: "light",
  },
});

const stylesTable = StyleSheet.create({
  table: {
    display: "flex",
    width: "auto",
    border: "1.5px solid #283C4C",
    marginTop: "10px",
    marginBotton: "5px",
    borderRadius: "10px",
  },
  tableCancelarMarginTop: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBotton: "5px",
    marginTop: "5px",
  },
  tableRow: {
    width: "100%",
    flexDirection: "row",
  },
  tableCol: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRight: "none",
  },
  tableCell: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 8,
  },
  tableText: {
    width: "100%",
    border: "1.5px solid #000",
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    fontSize: 8,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 2,
  },
  ColTablePrecing: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellPrecingRight: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 8,
    textAlign: "left",
  },
  tableCellPrecing: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 8,
    textAlign: "right",
  },
});

const stylesTableCharacteristics = StyleSheet.create({
  table: {
    display: "none",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "16.6666%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: "7%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: "5%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: "28%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol4: {
    width: "20%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  table4Background: {
    width: "20%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRight: "none",
    borderTopWidth: 0,
    backgroundColor: "#e8fd8e",
  },
  tableCell: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 6,
    paddingLeft: 2,
    paddingRight: 2,
  },
  tableCellTitle: {
    margin: "auto",
    fontSize: 7,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

const stylesTableDetailService = StyleSheet.create({
  tableCellSubTitle: {
    marginTop: 2,
    fontSize: 7,
  },
  tableCell: {
    marginTop: 2,
    fontSize: 6,
  },
});
