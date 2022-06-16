import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{r as o,o as i,c as r,a as s,e as a,F as l,b as e,f as c}from"./app.9b5eff52.js";const p={},d=s("p",null,"Before we dive into the course we want to take a look into what a resource is.",-1),u=s("p",null,"When writing InSpec code, many resources are available to you.",-1),h=e("You can "),m={href:"https://www.inspec.io/docs/reference/resources/",target:"_blank",rel:"noopener noreferrer"},k=e("explore the InSpec resources"),v=e(" to see which resources are available."),b=e("You can "),f={href:"https://github.com/inspec/inspec/tree/master/lib/inspec/resources",target:"_blank",rel:"noopener noreferrer"},_=e("examine the source code"),g=e(" to see what's available. For example, you can see how "),w=s("code",null,"file",-1),y=e(" and other InSpec resources are implemented."),x=e("There's also "),I={href:"https://www.inspec.io/docs/reference/dsl_resource/",target:"_blank",rel:"noopener noreferrer"},S=e("Resource DSL"),T=e(", which gives a brief overview of how to write your own resource."),R=c(`<h3 id="_6-1-resource-overview" tabindex="-1"><a class="header-anchor" href="#_6-1-resource-overview" aria-hidden="true">#</a> 6.1. Resource Overview</h3><p>Resources may be added to profiles in the libraries folder:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ tree examples/profile
examples/profile
<span class="token punctuation">..</span>.
\u251C\u2500\u2500 libraries
\u2502   \u2514\u2500\u2500 gordon_config.rb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-resource-structure" tabindex="-1"><a class="header-anchor" href="#_6-2-resource-structure" aria-hidden="true">#</a> 6.2. Resource Structure</h3><p>The smallest possible resource takes this form:</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token keyword">class</span> <span class="token class-name">Tiny</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  name <span class="token string-literal"><span class="token string">&#39;tiny&#39;</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Resources are written as a regular Ruby class which inherits from Inspec.resource. The number (1) specifies the version this resource plugin targets. As Chef InSpec evolves, this interface may change and may require a higher version.</p><p>The following attributes can be configured:</p><ul><li>name - Identifier of the resource (required)</li><li>desc - Description of the resource (optional)</li><li>example - Example usage of the resource (optional)</li><li>supports - (Chef InSpec 2.0+) Platform restrictions of the resource (optional)</li></ul><p>The following methods are available to the resource:</p><ul><li>inspec - Contains a registry of all other resources to interact with the operating system or target in general.</li><li>skip_resource - A resource may call this method to indicate that requirements aren\u2019t met. All tests that use this resource will be marked as skipped.</li></ul><p>The following example shows a full resource using attributes and methods to provide simple access to a configuration file:</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token keyword">class</span> <span class="token class-name">GordonConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  name <span class="token string-literal"><span class="token string">&#39;gordon_config&#39;</span></span>

  <span class="token comment"># Restrict to only run on the below platforms (if none were given, all OS&#39;s supported)</span>
  supports platform_family<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;fedora&#39;</span></span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;centos&#39;</span></span><span class="token punctuation">,</span> <span class="token symbol">release</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;6.9&#39;</span></span>
  <span class="token comment"># Supports \`*\` for wildcard matcher in the release</span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;centos&#39;</span></span><span class="token punctuation">,</span> <span class="token symbol">release</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;7.*&#39;</span></span>

  desc &#39;
    Resource description <span class="token operator">...</span>
  &#39;

  example &#39;
    describe gordon_config <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;signal&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">&quot;on&quot;</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  &#39;

  <span class="token comment"># Load the configuration file on initialization</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path <span class="token operator">||</span> <span class="token string-literal"><span class="token string">&#39;/etc/gordon.conf&#39;</span></span>
    <span class="token variable">@params</span> <span class="token operator">=</span> <span class="token class-name">SimpleConfig</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span> read_content <span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  <span class="token comment"># Expose all parameters of the configuration file.</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">method_missing</span></span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token variable">@params</span><span class="token punctuation">[</span>name<span class="token punctuation">]</span>
  <span class="token keyword">end</span>

  <span class="token keyword">private</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">read_content</span></span>
    f <span class="token operator">=</span> inspec<span class="token punctuation">.</span>file<span class="token punctuation">(</span><span class="token variable">@path</span><span class="token punctuation">)</span>
    <span class="token comment"># Test if the path exist and that it&#39;s a file</span>
    <span class="token keyword">if</span> f<span class="token punctuation">.</span>file<span class="token operator">?</span>
      <span class="token comment"># Retrieve the file&#39;s contents</span>
      f<span class="token punctuation">.</span>content
    <span class="token keyword">else</span>
      <span class="token comment"># If the file doesn&#39;t exist, skip all tests that use gordon_config</span>
      <span class="token keyword">raise</span> Inspec<span class="token double-colon punctuation">::</span>Exceptions<span class="token double-colon punctuation">::</span>ResourceSkipped<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Can&#39;t read config at </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@path</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let&#39;s break down each component.</p><h4 id="_6-2-1-class" tabindex="-1"><a class="header-anchor" href="#_6-2-1-class" aria-hidden="true">#</a> 6.2.1. class</h4><p>The class is where the ruby file is defined.</p><h4 id="_6-2-2-name" tabindex="-1"><a class="header-anchor" href="#_6-2-2-name" aria-hidden="true">#</a> 6.2.2. name</h4><p>The name is how we will call upon this resource within our controls, in the example above that would be <code>gordon_config</code>.</p><h4 id="_6-2-3-supports" tabindex="-1"><a class="header-anchor" href="#_6-2-3-supports" aria-hidden="true">#</a> 6.2.3. supports</h4><p>Supports are used to define/restrict the Ruby resource to work in specific ways, as shown in the example above that is used to restrict our class to specific platforms.</p><h4 id="_6-2-4-desc-examples" tabindex="-1"><a class="header-anchor" href="#_6-2-4-desc-examples" aria-hidden="true">#</a> 6.2.4. desc &amp; examples</h4><p>desc is used as a simple in code description of the purpose of this resource while the example is to show how the resource can be used in a control.</p><h4 id="_6-2-5-initialize-method" tabindex="-1"><a class="header-anchor" href="#_6-2-5-initialize-method" aria-hidden="true">#</a> 6.2.5. initialize method</h4><p>The initialize method is necessary because in inspec controls when we pass a parameter the Ruby class for the resource must have an initialize method to be defined to accept that paraemeter.</p><h4 id="_6-2-6-functionality-methods" tabindex="-1"><a class="header-anchor" href="#_6-2-6-functionality-methods" aria-hidden="true">#</a> 6.2.6. functionality methods</h4><p>These are the methods that perform the actions you require the resource to perform.</p>`,26);function q(z,C){const n=o("ExternalLinkIcon");return i(),r(l,null,[d,u,s("ul",null,[s("li",null,[h,s("a",m,[k,a(n)]),v]),s("li",null,[b,s("a",f,[_,a(n)]),g,w,y])]),s("p",null,[x,s("a",I,[S,a(n)]),T]),R],64)}var B=t(p,[["render",q],["__file","06.html.vue"]]);export{B as default};
