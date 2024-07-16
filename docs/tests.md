## 7. Testes do software

Nesta sessão são apresentados os testes realizados no software implementado:

_Deve ser utilizada a abordagem caixa preta, que tem por objetivo verificar a conformidade do software com os requisitos funcionais e não-funcionais do sistema._

_Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)._

_Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não-funcionais do software. Preencha a tabela com o plano de testes. Para cada Caso de Teste (CT), associe quais testes são responsáveis por verificar a conformidade do caso de teste. Veja a tabela de exemplo._

___

**Caso de Teste** | **CT01 - Cadastrar usuário**
|:--------------: | ------------
|**Procedimento**  | Cadastrar novo usuário. |
|**Dados de entrada** | Inserção de dados válidos no formulário de cadastro. |
|**Resultado obtido** | Dado cadastrado com sucesso. |  
  
___

**Caso de Teste** | **CT02 - Cadastrar usuário já existente**
|:--------------: | ------------
|**Procedimento**  | Cadastrar usuário já existente. |
|**Dados de entrada** | Inserção de dados válidos com nome de usuário já existente no banco. |
|**Resultado obtido** | Dado não cadastrado. |

___

**Caso de Teste** | **CT03 - Cadastrar barbeiro**
|:--------------: | ------------
|**Procedimento**  | Cadastrar novo barbeiro. |
|**Dados de entrada** | Inserção de dados válidos no formulário de cadastro de barbeiro. |
|**Resultado obtido** | Barbeiro cadastrado com sucesso. |

___

**Caso de Teste** | **CT04 - Cadastrar barbearia**
|:--------------: | ------------
|**Procedimento**  | Cadastrar nova barbearia. |
|**Dados de entrada** | Inserção de dados válidos no formulário de cadastro de barbearia. |
|**Resultado obtido** | Barbearia cadastrada com sucesso. |

___

**Caso de Teste** | **CT05 - Cadastrar serviço**
|:--------------: | ------------
|**Procedimento**  | Cadastrar novo serviço. |
|**Dados de entrada** | Inserção de dados válidos no formulário de cadastro de serviço. |
|**Resultado obtido** | Serviço cadastrado com sucesso. |

___

**Caso de Teste** | **CT06 - Login de usuário**
|:--------------: | ------------
|**Procedimento**  | Realizar login com um usuário registrado. |
|**Dados de entrada** | Inserção de credenciais válidas no formulário de login. |
|**Resultado obtido** | Login bem-sucedido e armazenamento de `user_type` e `id` nos cookies. |

___

**Caso de Teste** | **CT07 - Login de barbeiro**
|:--------------: | ------------
|**Procedimento**  | Realizar login com um barbeiro registrado. |
|**Dados de entrada** | Inserção de credenciais válidas no formulário de login. |
|**Resultado obtido** | Login bem-sucedido e armazenamento de `user_type` e `id` nos cookies. |

___

**Caso de Teste** | **CT08 - Login de barbearia**
|:--------------: | ------------
|**Procedimento**  | Realizar login com uma barbearia registrada. |
|**Dados de entrada** | Inserção de credenciais válidas no formulário de login. |
|**Resultado obtido** | Login bem-sucedido e armazenamento de `user_type` e `id` nos cookies. |

___

**Caso de Teste** | **CT09 - Agendamento de serviço**
|:--------------: | ------------
|**Procedimento**  | Realizar agendamento de serviço. |
|**Dados de entrada** | Seleção da barbearia, barbeiro, horário e serviço desejado. |
|**Resultado obtido** | Agendamento realizado com sucesso e exibido no perfil do usuário. |

___

## Avaliação dos Testes de Software

_Discorra sobre os resultados do teste, ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes._
