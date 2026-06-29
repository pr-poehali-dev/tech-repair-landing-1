export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'select';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
}

export interface SectionDef {
  table: string;
  title: string;
  icon: string;
  fields: FieldDef[];
}

const iconHint = 'Имя иконки (например: Refrigerator, Tv, Wrench)';

export const SECTIONS: SectionDef[] = [
  {
    table: 'services',
    title: 'Услуги',
    icon: 'Wrench',
    fields: [
      { key: 'title', label: 'Название', type: 'text' },
      { key: 'icon', label: iconHint, type: 'text' },
      { key: 'price_from', label: 'Цена от', type: 'text' },
      { key: 'features', label: 'Список проблем (через ;)', type: 'textarea' },
      { key: 'is_popular', label: 'Популярная (Хит)', type: 'boolean' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    table: 'prices',
    title: 'Прайс-лист',
    icon: 'Calculator',
    fields: [
      { key: 'category', label: 'Категория', type: 'select', options: [
        { value: 'fridge', label: 'Холодильники' },
        { value: 'washer', label: 'Стиральные машины' },
        { value: 'tv', label: 'Телевизоры' },
      ] },
      { key: 'name', label: 'Услуга', type: 'text' },
      { key: 'price', label: 'Стоимость', type: 'text' },
      { key: 'duration', label: 'Время', type: 'text' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    table: 'portfolio',
    title: 'Портфолио',
    icon: 'Image',
    fields: [
      { key: 'title', label: 'Название', type: 'text' },
      { key: 'icon', label: iconHint, type: 'text' },
      { key: 'problem', label: 'Проблема', type: 'textarea' },
      { key: 'solution', label: 'Решение', type: 'textarea' },
      { key: 'duration', label: 'Время ремонта', type: 'text' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    table: 'reviews',
    title: 'Отзывы',
    icon: 'Star',
    fields: [
      { key: 'name', label: 'Имя клиента', type: 'text' },
      { key: 'role', label: 'Техника', type: 'text' },
      { key: 'text', label: 'Текст отзыва', type: 'textarea' },
      { key: 'rating', label: 'Оценка (1-5)', type: 'number' },
      { key: 'is_published', label: 'Опубликован', type: 'boolean' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    table: 'blog_posts',
    title: 'Блог',
    icon: 'Newspaper',
    fields: [
      { key: 'title', label: 'Заголовок', type: 'text' },
      { key: 'category', label: 'Категория', type: 'text' },
      { key: 'icon', label: iconHint, type: 'text' },
      { key: 'excerpt', label: 'Краткое описание', type: 'textarea' },
      { key: 'read_time', label: 'Время чтения', type: 'text' },
      { key: 'published_at', label: 'Дата (ГГГГ-ММ-ДД)', type: 'text' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    table: 'faqs',
    title: 'Вопросы (FAQ)',
    icon: 'MessageCircleQuestion',
    fields: [
      { key: 'question', label: 'Вопрос', type: 'text' },
      { key: 'answer', label: 'Ответ', type: 'textarea' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    table: 'team_members',
    title: 'Команда',
    icon: 'Users',
    fields: [
      { key: 'name', label: 'Имя', type: 'text' },
      { key: 'role', label: 'Должность', type: 'text' },
      { key: 'experience', label: 'Опыт', type: 'text' },
      { key: 'skill', label: 'Специализация', type: 'text' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
];
