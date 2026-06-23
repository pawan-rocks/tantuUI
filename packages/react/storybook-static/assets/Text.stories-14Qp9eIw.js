import{j as e}from"./jsx-runtime-Z5uAzocK.js";import{T as t}from"./Text-bDihZ7Sc.js";import"./index-pP6CS22B.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-2dOUpm6k.js";const W={title:"Components/Text",component:t,tags:["autodocs"],argTypes:{as:{control:"select",options:["p","span","div","h1","h2","h3","h4","h5","h6","label","small","strong","em"],description:"HTML element to render",table:{category:"Polymorphic",defaultValue:{summary:"p"}}},size:{control:"select",options:["2xs","xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl","7xl"],description:"Font size token key",table:{category:"Typography"}},weight:{control:"select",options:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],description:"Font weight token key",table:{category:"Typography"}},color:{control:"select",options:["primary","secondary","tertiary","disabled","inverse","link","danger","success","warning"],description:"Semantic color token",table:{category:"Typography"}},align:{control:"select",options:["left","center","right","justify"],description:"Text alignment",table:{category:"Typography"}},truncate:{control:"number",description:"Clamp to N lines (1 = single-line ellipsis)",table:{category:"Layout"}},children:{control:"text",table:{category:"Content"}}},args:{children:"The quick brown fox jumps over the lazy dog.",as:"p",size:"md",weight:"normal"}},i={name:"⚡ Playground"},o={name:"Type Scale",parameters:{controls:{disable:!0}},render:()=>{const r=["7xl","6xl","5xl","4xl","3xl","2xl","xl","lg","md","sm","xs","2xs"];return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--tui-spacing-4)"},children:r.map(n=>e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:"var(--tui-spacing-4)",borderBottom:"1px solid var(--tui-color-border-default)",paddingBottom:"var(--tui-spacing-3)"},children:[e.jsx("span",{style:{width:48,flexShrink:0,fontSize:"var(--tui-font-size-xs)",color:"var(--tui-color-text-tertiary)",fontFamily:"var(--tui-font-family-mono)"},children:n}),e.jsx(t,{size:n,children:"The quick brown fox"})]},n))})}},s={name:"Font Weights",parameters:{controls:{disable:!0}},render:()=>{const r=["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"];return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--tui-spacing-3)"},children:r.map(n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--tui-spacing-4)"},children:[e.jsx("span",{style:{width:100,flexShrink:0,fontSize:"var(--tui-font-size-xs)",color:"var(--tui-color-text-tertiary)",fontFamily:"var(--tui-font-family-mono)"},children:n}),e.jsx(t,{size:"xl",weight:n,children:"The quick brown fox"})]},n))})}},a={name:"Colors",parameters:{controls:{disable:!0}},render:()=>{const r=["primary","secondary","tertiary","disabled","link","danger","success","warning"];return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--tui-spacing-3)"},children:r.map(n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--tui-spacing-4)"},children:[e.jsx("span",{style:{width:80,flexShrink:0,fontSize:"var(--tui-font-size-xs)",color:"var(--tui-color-text-tertiary)",fontFamily:"var(--tui-font-family-mono)"},children:n}),e.jsxs(t,{color:n,children:["Sample text using the ",n," color token"]})]},n))})}},l={name:"Heading Hierarchy",parameters:{controls:{disable:!0}},render:()=>e.jsxs("article",{style:{display:"flex",flexDirection:"column",gap:"var(--tui-spacing-4)",maxWidth:600},children:[e.jsx(t,{as:"h1",size:"4xl",weight:"bold",children:"H1 — Page Title"}),e.jsx(t,{as:"h2",size:"3xl",weight:"semibold",children:"H2 — Section Heading"}),e.jsx(t,{as:"h3",size:"2xl",weight:"semibold",children:"H3 — Subsection"}),e.jsx(t,{as:"h4",size:"xl",weight:"medium",children:"H4 — Card Title"}),e.jsx(t,{size:"md",color:"secondary",children:"Body text — The quick brown fox jumps over the lazy dog. Sticks and stones may break my bones but words will never hurt me."}),e.jsx(t,{size:"sm",color:"tertiary",children:"Caption — Small supporting text used for metadata, timestamps, or labels."})]})},c={name:"Truncation",parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--tui-spacing-4)",maxWidth:400},children:[e.jsxs("div",{children:[e.jsx(t,{size:"xs",color:"tertiary",style:{marginBottom:4},children:"Single line (truncate=true)"}),e.jsx(t,{truncate:!0,children:"The quick brown fox jumps over the lazy dog. This text is long and will be truncated after one line."})]}),e.jsxs("div",{children:[e.jsx(t,{size:"xs",color:"tertiary",style:{marginBottom:4},children:"Two lines (truncate=2)"}),e.jsx(t,{truncate:2,children:"The quick brown fox jumps over the lazy dog. This text is long and will be truncated after two lines of visible content."})]}),e.jsxs("div",{children:[e.jsx(t,{size:"xs",color:"tertiary",style:{marginBottom:4},children:"Three lines (truncate=3)"}),e.jsx(t,{truncate:3,children:"The quick brown fox jumps over the lazy dog. This text is long and will be truncated after three lines. Keep adding words to see the effect in action — it should clamp here."})]})]})};var d,x,m;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "⚡ Playground"
}`,...(m=(x=i.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var p,u,g;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Type Scale",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    const sizes = ["7xl", "6xl", "5xl", "4xl", "3xl", "2xl", "xl", "lg", "md", "sm", "xs", "2xs"] as const;
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--tui-spacing-4)"
    }}>
        {sizes.map(size => <div key={size} style={{
        display: "flex",
        alignItems: "baseline",
        gap: "var(--tui-spacing-4)",
        borderBottom: "1px solid var(--tui-color-border-default)",
        paddingBottom: "var(--tui-spacing-3)"
      }}>
            <span style={{
          width: 48,
          flexShrink: 0,
          fontSize: "var(--tui-font-size-xs)",
          color: "var(--tui-color-text-tertiary)",
          fontFamily: "var(--tui-font-family-mono)"
        }}>{size}</span>
            <Text size={size}>The quick brown fox</Text>
          </div>)}
      </div>;
  }
}`,...(g=(u=o.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,y,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Font Weights",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    const weights = ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"] as const;
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--tui-spacing-3)"
    }}>
        {weights.map(weight => <div key={weight} style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--tui-spacing-4)"
      }}>
            <span style={{
          width: 100,
          flexShrink: 0,
          fontSize: "var(--tui-font-size-xs)",
          color: "var(--tui-color-text-tertiary)",
          fontFamily: "var(--tui-font-family-mono)"
        }}>{weight}</span>
            <Text size="xl" weight={weight}>The quick brown fox</Text>
          </div>)}
      </div>;
  }
}`,...(f=(y=s.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var v,b,T;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Colors",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    const colors = ["primary", "secondary", "tertiary", "disabled", "link", "danger", "success", "warning"] as const;
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--tui-spacing-3)"
    }}>
        {colors.map(color => <div key={color} style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--tui-spacing-4)"
      }}>
            <span style={{
          width: 80,
          flexShrink: 0,
          fontSize: "var(--tui-font-size-xs)",
          color: "var(--tui-color-text-tertiary)",
          fontFamily: "var(--tui-font-family-mono)"
        }}>{color}</span>
            <Text color={color}>Sample text using the {color} color token</Text>
          </div>)}
      </div>;
  }
}`,...(T=(b=a.parameters)==null?void 0:b.docs)==null?void 0:T.source}}};var w,z,j;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Heading Hierarchy",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <article style={{
    display: "flex",
    flexDirection: "column",
    gap: "var(--tui-spacing-4)",
    maxWidth: 600
  }}>
      <Text as="h1" size="4xl" weight="bold">H1 — Page Title</Text>
      <Text as="h2" size="3xl" weight="semibold">H2 — Section Heading</Text>
      <Text as="h3" size="2xl" weight="semibold">H3 — Subsection</Text>
      <Text as="h4" size="xl" weight="medium">H4 — Card Title</Text>
      <Text size="md" color="secondary">Body text — The quick brown fox jumps over the lazy dog. Sticks and stones may break my bones but words will never hurt me.</Text>
      <Text size="sm" color="tertiary">Caption — Small supporting text used for metadata, timestamps, or labels.</Text>
    </article>
}`,...(j=(z=l.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var k,S,H;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Truncation",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "var(--tui-spacing-4)",
    maxWidth: 400
  }}>
      <div>
        <Text size="xs" color="tertiary" style={{
        marginBottom: 4
      }}>Single line (truncate=true)</Text>
        <Text truncate>The quick brown fox jumps over the lazy dog. This text is long and will be truncated after one line.</Text>
      </div>
      <div>
        <Text size="xs" color="tertiary" style={{
        marginBottom: 4
      }}>Two lines (truncate=2)</Text>
        <Text truncate={2}>The quick brown fox jumps over the lazy dog. This text is long and will be truncated after two lines of visible content.</Text>
      </div>
      <div>
        <Text size="xs" color="tertiary" style={{
        marginBottom: 4
      }}>Three lines (truncate=3)</Text>
        <Text truncate={3}>The quick brown fox jumps over the lazy dog. This text is long and will be truncated after three lines. Keep adding words to see the effect in action — it should clamp here.</Text>
      </div>
    </div>
}`,...(H=(S=c.parameters)==null?void 0:S.docs)==null?void 0:H.source}}};const P=["Playground","TypeScale","FontWeights","Colors","Headings","Truncation"];export{a as Colors,s as FontWeights,l as Headings,i as Playground,c as Truncation,o as TypeScale,P as __namedExportsOrder,W as default};
