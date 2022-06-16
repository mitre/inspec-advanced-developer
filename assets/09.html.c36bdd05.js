import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as a,c as e,F as t,f as i,a as s}from"./app.9b5eff52.js";const o={},l=i(`<p>Now let&#39;s try a more complicated example. Let&#39;s say we want to create a resource that can parse a <code>docker-compose</code> file.</p><h3 id="_9-1-create-new-profile-and-setup-docker-files" tabindex="-1"><a class="header-anchor" href="#_9-1-create-new-profile-and-setup-docker-files" aria-hidden="true">#</a> 9.1. Create new profile and setup docker files</h3><p>First, let&#39;s write our docker compose file <code>docker-compose.yml</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">workstation</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> workstation
    <span class="token key atrule">image</span><span class="token punctuation">:</span> learnchef/inspec_workstation
    <span class="token key atrule">stdin_open</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">tty</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> target
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> .<span class="token punctuation">:</span>/root
  <span class="token key atrule">target</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> learnchef/inspec_target
    <span class="token key atrule">stdin_open</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">tty</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We will continue writing our controls to check against this docker file:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>inspec init profile docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_9-2-develop-controls-to-test-run-profile" tabindex="-1"><a class="header-anchor" href="#_9-2-develop-controls-to-test-run-profile" aria-hidden="true">#</a> 9.2. Develop controls to test/run profile</h3><p>In the <code>controls/example.rb</code> file, write the control:</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code>describe yaml<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;file_name&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;setting&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should_not eq <span class="token string-literal"><span class="token string">&#39;value&#39;</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We need to replace the <code>file_name</code> above with the location of the <code>docker-compose.yml</code> file. We also need to change the <code>setting</code> to grab the tag we want to retrieve. Finally we need to change <code>value</code> with the actual value as shown in the docker compose file.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code>describe yaml<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/path/to/docker-compose.yml&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;services&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;workstation&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;image&#39;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">&#39;learnchef/inspec_workstation&#39;</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;services&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;workstation&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;volumes&#39;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">&#39;.:/root&#39;</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now if we test this control using the following command we should see all the tests pass.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_9-3-rewrite-test-to-utilize-resource" tabindex="-1"><a class="header-anchor" href="#_9-3-rewrite-test-to-utilize-resource" aria-hidden="true">#</a> 9.3. Rewrite test to utilize resource</h3><p>Going back to the control, we will write it using a resource that doesn&#39;t exist called docker-compose-config that is going to take a path as a parameter.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code>describe yaml<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/path/to/docker-compose.yml&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;services&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;workstation&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;image&#39;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">&#39;learnchef/inspec_workstation&#39;</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;services&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;workstation&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;volumes&#39;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">&#39;.:/root&#39;</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>

describe docker_compose_config<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/path/to/docker-compose.yml&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;services.workstation.image&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">&#39;learnchef/inspec_workstation&#39;</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;services.workstation.volumes&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">&#39;.:/root&#39;</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now we should see an error if we go back to terminal and run the same command to execute a scan</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>We should get an error saying the <code>docker_compose_config</code> method does not yet exist. That&#39;s because we have not yet defined this resource.</p><h3 id="_9-4-develop-docker-resource" tabindex="-1"><a class="header-anchor" href="#_9-4-develop-docker-resource" aria-hidden="true">#</a> 9.4. Develop docker resource</h3><p>In the <code>libraries</code> directory of the profile we will make a <code>docker_compose_config.rb</code> file, , the content of the file should look like this:</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">&#39;docker_compose_config&#39;</span></span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">Using InSpec Init to Create the Resource</p><p>Alternatively, you can use <code>inspec init resource &lt;your-resource-name&gt;</code> to create the template for your custom resource. However, make sure you check that the &quot;lib&quot; folder is renamed to &quot;libraries&quot;, or that InSpec recognizes the location of your custom resource.</p></div><p>Now when we save and run the profile again using:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>We will get an error saying we gave it the wrong number of arguments: <code>was given 1 but expected 0</code>. This is because every class in Ruby that has a parameter must have an initialize function to accept that parameter.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">&#39;docker_compose_config&#39;</span></span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path
  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now let&#39;s run the profile once more.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This time the profile runs, but we get a message that the <code>docker_compose_config</code> resource does not have the <code>services</code> method. So let&#39;s define that method now:</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">&#39;docker_compose_config&#39;</span></span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">services</span></span>

  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Start by just defining the <code>services</code> method. Then, let&#39;s run the profile once more.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Now we got a different failure that tells us a <code>nil</code> value was returned. So now we will go ahead and define the services method. We will use an already existing InSpec resource to parse the path file.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">&#39;docker_compose_config&#39;</span></span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path
    <span class="token variable">@yaml</span> <span class="token operator">=</span> inspec<span class="token punctuation">.</span>yaml<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">services</span></span>
    <span class="token variable">@yaml</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;services&#39;</span></span><span class="token punctuation">]</span>
  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now let&#39;s run the profile once more.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You will notice that it parses it correctly, but instead of our result we end up getting a hash. We need to convert the hash into an object that appears like other objects so that we may use our dot notation. So we will wrap our hash in a Ruby class called a <code>Hashie::Mash</code>. This gives us a quick way to convert a hash into a Ruby object with a number of methods attached to it. You will have to import the Hashie library by running <code>gem install hashie</code> and import it in the resource file to be used. It and is written as follows:</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;hashie/mash&quot;</span></span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">&#39;docker_compose_config&#39;</span></span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path
    <span class="token variable">@yaml</span> <span class="token operator">=</span> inspec<span class="token punctuation">.</span>yaml<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">services</span></span>
    Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token variable">@yaml</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;services&#39;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lets run the profile again.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Everything passed!</p><div class="custom-container info"><p class="custom-container-title">Check your work</p><p>Check your work with the InSpec video below that walks through this docker resource example!</p></div>`,43),c=s("div",{class:"video-container"},[s("iframe",{width:"1462",height:"762",src:"https://www.youtube.com/embed/9rbb2RWa9Oo?list=PLSZbtIlMt5rcbXOpMRucKzRMXR7HX7awy",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""})],-1);function p(r,d){return a(),e(t,null,[l,c],64)}var v=n(o,[["render",p],["__file","09.html.vue"]]);export{v as default};
