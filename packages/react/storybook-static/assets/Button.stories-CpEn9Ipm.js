import{j as t}from"./jsx-runtime-Z5uAzocK.js";import{B as n}from"./Button-BhTiFFE2.js";import"./index-pP6CS22B.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-2dOUpm6k.js";const m=()=>t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none","aria-hidden":"true",children:t.jsx("path",{d:"M2 7h10M7 2l5 5-5 5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),g=()=>t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none","aria-hidden":"true",children:t.jsx("path",{d:"M7 2v10M2 7h10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),T={title:"Components/Button",component:n,tags:["autodocs"],argTypes:{variant:{control:"select",options:["solid","outline","ghost","soft"],description:"Visual style variant",table:{category:"Appearance",defaultValue:{summary:"solid"}}},intent:{control:"select",options:["default","primary","success","warning","danger","info"],description:"Color intent / semantic meaning",table:{category:"Appearance",defaultValue:{summary:"primary"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Button size",table:{category:"Appearance",defaultValue:{summary:"md"}}},loading:{control:"boolean",description:"Show loading spinner and disable interaction",table:{category:"State"}},disabled:{control:"boolean",description:"Disabled state",table:{category:"State"}},fullWidth:{control:"boolean",description:"Stretch to fill container width",table:{category:"Layout"}},children:{control:"text",description:"Button label",table:{category:"Content"}},onClick:{action:"clicked"}},args:{children:"Button",variant:"solid",intent:"primary",size:"md",loading:!1,disabled:!1,fullWidth:!1}},a={name:"⚡ Playground",args:{children:"Click me"}},i={name:"Variants",parameters:{controls:{disable:!0}},render:()=>t.jsxs("div",{style:{display:"flex",gap:"var(--tui-spacing-3)",flexWrap:"wrap",alignItems:"center"},children:[t.jsx(n,{variant:"solid",children:"Solid"}),t.jsx(n,{variant:"outline",children:"Outline"}),t.jsx(n,{variant:"ghost",children:"Ghost"}),t.jsx(n,{variant:"soft",children:"Soft"})]})},o={name:"Intents",parameters:{controls:{disable:!0}},render:()=>t.jsx("div",{style:{display:"flex",gap:"var(--tui-spacing-3)",flexWrap:"wrap",alignItems:"center"},children:["default","primary","success","warning","danger"].map(e=>t.jsx(n,{intent:e,children:e.charAt(0).toUpperCase()+e.slice(1)},e))})},s={name:"Sizes",parameters:{controls:{disable:!0}},render:()=>t.jsx("div",{style:{display:"flex",gap:"var(--tui-spacing-3)",flexWrap:"wrap",alignItems:"center"},children:["xs","sm","md","lg","xl"].map(e=>t.jsx(n,{size:e,children:e.toUpperCase()},e))})},l={name:"Variant × Intent Matrix",parameters:{controls:{disable:!0}},render:()=>{const e=["solid","outline","ghost","soft"],O=["primary","default","success","warning","danger"];return t.jsx("div",{style:{overflowX:"auto"},children:t.jsxs("table",{style:{borderCollapse:"collapse",width:"100%",fontFamily:"var(--tui-font-family-sans)"},children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{padding:"var(--tui-spacing-2) var(--tui-spacing-3)",textAlign:"left",fontSize:"var(--tui-font-size-xs)",color:"var(--tui-color-text-tertiary)",fontWeight:"var(--tui-font-weight-semibold)",borderBottom:"1px solid var(--tui-color-border-default)"},children:"intent ↓ / variant →"}),e.map(r=>t.jsx("th",{style:{padding:"var(--tui-spacing-2) var(--tui-spacing-3)",textAlign:"center",fontSize:"var(--tui-font-size-xs)",color:"var(--tui-color-text-secondary)",fontWeight:"var(--tui-font-weight-semibold)",borderBottom:"1px solid var(--tui-color-border-default)"},children:r},r))]})}),t.jsx("tbody",{children:O.map(r=>t.jsxs("tr",{children:[t.jsx("td",{style:{padding:"var(--tui-spacing-3)",fontSize:"var(--tui-font-size-xs)",color:"var(--tui-color-text-secondary)",fontWeight:"var(--tui-font-weight-medium)",borderBottom:"1px solid var(--tui-color-border-default)"},children:r}),e.map(p=>t.jsx("td",{style:{padding:"var(--tui-spacing-3)",textAlign:"center",borderBottom:"1px solid var(--tui-color-border-default)"},children:t.jsx(n,{intent:r,variant:p,size:"sm",children:r})},p))]},r))})]})})}},d={name:"With Icons",parameters:{controls:{disable:!0}},render:()=>t.jsxs("div",{style:{display:"flex",gap:"var(--tui-spacing-3)",flexWrap:"wrap",alignItems:"center"},children:[t.jsx(n,{leadingIcon:t.jsx(g,{}),children:"New item"}),t.jsx(n,{trailingIcon:t.jsx(m,{}),variant:"outline",children:"Continue"}),t.jsx(n,{leadingIcon:t.jsx(g,{}),trailingIcon:t.jsx(m,{}),variant:"soft",children:"Both icons"})]})},c={name:"States",parameters:{controls:{disable:!0}},render:()=>t.jsxs("div",{style:{display:"flex",gap:"var(--tui-spacing-3)",flexWrap:"wrap",alignItems:"center"},children:[t.jsx(n,{children:"Default"}),t.jsx(n,{loading:!0,children:"Loading"}),t.jsx(n,{disabled:!0,children:"Disabled"}),t.jsx(n,{loading:!0,variant:"outline",children:"Loading outline"})]})},u={name:"Full Width",parameters:{controls:{disable:!0}},render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--tui-spacing-3)",maxWidth:400},children:[t.jsx(n,{fullWidth:!0,children:"Full width solid"}),t.jsx(n,{fullWidth:!0,variant:"outline",children:"Full width outline"})]})};var h,v,x;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "⚡ Playground",
  args: {
    children: "Click me"
  }
}`,...(x=(v=a.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var f,y,b;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Variants",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    gap: "var(--tui-spacing-3)",
    flexWrap: "wrap",
    alignItems: "center"
  }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="soft">Soft</Button>
    </div>
}`,...(b=(y=i.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var B,j,w;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Intents",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    gap: "var(--tui-spacing-3)",
    flexWrap: "wrap",
    alignItems: "center"
  }}>
      {(["default", "primary", "success", "warning", "danger"] as const).map(intent => <Button key={intent} intent={intent}>{intent.charAt(0).toUpperCase() + intent.slice(1)}</Button>)}
    </div>
}`,...(w=(j=o.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var W,I,S;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: "Sizes",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    gap: "var(--tui-spacing-3)",
    flexWrap: "wrap",
    alignItems: "center"
  }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Button key={size} size={size}>{size.toUpperCase()}</Button>)}
    </div>
}`,...(S=(I=s.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var z,k,C;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: "Variant × Intent Matrix",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    const variants = ["solid", "outline", "ghost", "soft"] as const;
    const intents = ["primary", "default", "success", "warning", "danger"] as const;
    return <div style={{
      overflowX: "auto"
    }}>
        <table style={{
        borderCollapse: "collapse",
        width: "100%",
        fontFamily: "var(--tui-font-family-sans)"
      }}>
          <thead>
            <tr>
              <th style={{
              padding: "var(--tui-spacing-2) var(--tui-spacing-3)",
              textAlign: "left",
              fontSize: "var(--tui-font-size-xs)",
              color: "var(--tui-color-text-tertiary)",
              fontWeight: "var(--tui-font-weight-semibold)",
              borderBottom: "1px solid var(--tui-color-border-default)"
            }}>
                intent ↓ / variant →
              </th>
              {variants.map(v => <th key={v} style={{
              padding: "var(--tui-spacing-2) var(--tui-spacing-3)",
              textAlign: "center",
              fontSize: "var(--tui-font-size-xs)",
              color: "var(--tui-color-text-secondary)",
              fontWeight: "var(--tui-font-weight-semibold)",
              borderBottom: "1px solid var(--tui-color-border-default)"
            }}>
                  {v}
                </th>)}
            </tr>
          </thead>
          <tbody>
            {intents.map(intent => <tr key={intent}>
                <td style={{
              padding: "var(--tui-spacing-3)",
              fontSize: "var(--tui-font-size-xs)",
              color: "var(--tui-color-text-secondary)",
              fontWeight: "var(--tui-font-weight-medium)",
              borderBottom: "1px solid var(--tui-color-border-default)"
            }}>
                  {intent}
                </td>
                {variants.map(variant => <td key={variant} style={{
              padding: "var(--tui-spacing-3)",
              textAlign: "center",
              borderBottom: "1px solid var(--tui-color-border-default)"
            }}>
                    <Button intent={intent} variant={variant} size="sm">{intent}</Button>
                  </td>)}
              </tr>)}
          </tbody>
        </table>
      </div>;
  }
}`,...(C=(k=l.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var A,F,V;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "With Icons",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    gap: "var(--tui-spacing-3)",
    flexWrap: "wrap",
    alignItems: "center"
  }}>
      <Button leadingIcon={<PlusIcon />}>New item</Button>
      <Button trailingIcon={<ArrowRight />} variant="outline">Continue</Button>
      <Button leadingIcon={<PlusIcon />} trailingIcon={<ArrowRight />} variant="soft">Both icons</Button>
    </div>
}`,...(V=(F=d.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};var L,M,D;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "States",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    gap: "var(--tui-spacing-3)",
    flexWrap: "wrap",
    alignItems: "center"
  }}>
      <Button>Default</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button loading variant="outline">Loading outline</Button>
    </div>
}`,...(D=(M=c.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};var P,R,U;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Full Width",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "var(--tui-spacing-3)",
    maxWidth: 400
  }}>
      <Button fullWidth>Full width solid</Button>
      <Button fullWidth variant="outline">Full width outline</Button>
    </div>
}`,...(U=(R=u.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};const q=["Playground","Variants","Intents","Sizes","Matrix","WithIcons","States","FullWidth"];export{u as FullWidth,o as Intents,l as Matrix,a as Playground,s as Sizes,c as States,i as Variants,d as WithIcons,q as __namedExportsOrder,T as default};
