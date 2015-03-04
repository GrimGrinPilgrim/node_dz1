Middleman Stater
====

Установка
---
	# переходим в директорию middleman
	cd ~/.middleman/

	# удаляем существующий дефолтный шаблон (или переименовываем его)
	rm -r .default

	# устанавливаем наш шаблон по умолчанию
	git clone git@bitbucket.org:hse_carpenters/middleman-starter.git default

Использование
---
	# инициализируем проектт
	middlemain init PROJECT_NAME

	# удаляем существующий гит
	cd PROJECT_NAME/.git


