import Vue from 'vue';
import App from './App.vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueApollo from 'vue-apollo';

Vue.config.productionTip = false;

// Hasura GraphQL Api adresimiz
const hasuraLink = new HttpLink({ uri: 'http://localhost:8080/v1/graphql' });

/* 
  Servis iletişimini sağlayan nesne
  GraphQL istemcileri veriyi genellikle cache'de tutar.
  Tarayıcı ilk olarak cache'ten okuma yapar. 
  Performans ve network trafiğini azaltmış oluruz bu şekilde.
*/
const apolloClient = new ApolloClient({
  link: hasuraLink, // Kullanacağı servis adresini veriyoruz
  connectToDevTools: true, // Chrome'da dev tools üzerinde Apollo tab'ının çıkmasını sağlar. Debug işlerimiz kolaylaşır
  cache: new InMemoryCache() // ApolloClient'ın varsayılan Cache uyarlaması için InMemoryCache kullanılıyor. 
});

// Vue ortamının GraphQL ile entegre edebilmek için VueApollo kütüphanesini entegre ediyoruz. (https://akryum.github.io/vue-apollo/)
Vue.use(VueApollo);

/* 
  Vue tarafında GraphQL sorguları oluşturabilmek ve veri girişleri(mutations)
  yapabilmek için ApolloProvider örneği kullanmamız gerekiyor.
  VueApollo'den üretilen bu nesnenin Hasura tarafına işlemleri commit
  edebilmesi içinse yukarıdaki apolloClient'ı parametre olarak atıyoruz
*/
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  apolloProvider,// Vue uygulamamızın ApolloProvider'ı kullanabilmesi için eklendi
  render: h => h(App),
}).$mount('#app');
