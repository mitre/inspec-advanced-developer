import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{r as o,o as i,c,a as e,e as t,F as r,b as s,f as l}from"./app.9b5eff52.js";const d={},p=s("In the "),u={href:"https://mitre-inspec-developer.netlify.app/course/02.html",target:"_blank",rel:"noopener noreferrer"},h=s("first class"),m=s(", we explained the structure and output of InSpec Profiles. Let's review some content, then practice by revisiting, running, and viewing results of an InSpec profile."),k=l(`<h2 id="_2-inspec-content-review" tabindex="-1"><a class="header-anchor" href="#_2-inspec-content-review" aria-hidden="true">#</a> 2. InSpec Content Review</h2><h3 id="_2-1-inspec-profile-structure" tabindex="-1"><a class="header-anchor" href="#_2-1-inspec-profile-structure" aria-hidden="true">#</a> 2.1 InSpec Profile Structure</h3><p>Remember that a <code>profile</code> is a set of automated tests that usually relates directly back to a Security Requirements Benchmark.</p><p>Profiles have two (2) required elements:</p><ul><li>An <code>inspec.yml</code> file</li><li>A <code>controls</code> directory</li></ul><p>and four (4) optional elements:</p><ul><li>A <code>libraries</code> directory</li><li>A <code>files</code> directory</li><li>An <code>inputs.yml</code> file</li><li>A <code>README.md</code> file</li></ul><h3 id="_2-2-control-structure" tabindex="-1"><a class="header-anchor" href="#_2-2-control-structure" aria-hidden="true">#</a> 2.2 Control Structure</h3><p>Let&#39;s take a look at the default control file, <code>controls/example.rb</code>.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code>title <span class="token string-literal"><span class="token string">&#39;sample section&#39;</span></span>

<span class="token comment"># you can also use plain tests</span>
describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/tmp&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>

<span class="token comment"># you add controls here</span>
control <span class="token string-literal"><span class="token string">&#39;tmp-1.0&#39;</span></span> <span class="token keyword">do</span>                        <span class="token comment"># A unique ID for this control</span>
  impact <span class="token number">0.7</span>                                <span class="token comment"># The criticality, if this control fails.</span>
  title <span class="token string-literal"><span class="token string">&#39;Create /tmp directory&#39;</span></span>             <span class="token comment"># A human-readable title</span>
  desc <span class="token string-literal"><span class="token string">&#39;An optional description...&#39;</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/tmp&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>                  <span class="token comment"># The actual test</span>
    it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This example shows two tests. Both tests check for the existence of the <code>/tmp</code> directory. The second test provides additional information about the test. Let&#39;s break down each component.</p><ul><li><code>control</code> (line 9) is followed by the control&#39;s name. Each control in a profile has a unique name.</li><li><code>impact</code> (line 10) measures the relative importance of the test and must be a value between 0.0 and 1.0.</li><li><code>title</code> (line 11) defines the control&#39;s purpose.</li><li><code>desc</code> (line 12) provides a more complete description of what the control checks for.</li><li><code>describe</code> (lines 13 \u2014 15) defines the test. Here, the test checks for the existence of the <code>/tmp</code> directory.</li></ul><h3 id="_2-3-describe-block-structure" tabindex="-1"><a class="header-anchor" href="#_2-3-describe-block-structure" aria-hidden="true">#</a> 2.3 Describe Block Structure</h3><p>As with many test frameworks, InSpec code resembles natural language. Here&#39;s the format of a describe block.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code>describe <span class="token operator">&lt;</span>entity<span class="token operator">&gt;</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> <span class="token operator">&lt;</span>expectation<span class="token operator">&gt;</span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),b={class:"custom-container tip"},v=e("p",{class:"custom-container-title"},"Inspec Resources",-1),f=s("InSpec uses resources like the "),_=e("code",null,"file",-1),y=s(" resource to aid in control development. These resources can often be used as the "),g=e("code",null,"<entity>",-1),w=s(" in the describe block, where the expectation is checking a requirement of that entity. Find a list of resources "),x={href:"https://docs.chef.io/inspec/resources/",target:"_blank",rel:"noopener noreferrer"},A=s("here"),I=s(".");function S(B,E){const n=o("ExternalLinkIcon");return i(),c(r,null,[e("p",null,[p,e("a",u,[h,t(n)]),m]),k,e("div",b,[v,e("p",null,[f,_,y,g,w,e("a",x,[A,t(n)]),I])])],64)}var L=a(d,[["render",S],["__file","02.html.vue"]]);export{L as default};
