<!-- Login -->

        <div class="lc-block toggled" id="l-login">
            <?= $this->Flash->render() ?>
            <?= $this->Form->create() ?>
            <div class="input-group m-b-20">
                <span class="input-group-addon"><i class="md md-person"></i></span>
                <div class="fg-line">
                    <?= $this->Form->input('username',array('class'=>'form-control', 'div'=>false, 'label'=>false, 'placeholder'=>__('Felhasználónév'))) ?>
                </div>
            </div>
            
            <div class="input-group m-b-20">
                <span class="input-group-addon"><i class="md md-lock"></i></span>
                <div class="fg-line">
                    <?= $this->Form->input('password',array('class'=>'form-control', 'div'=>false, 'label'=>false, 'placeholder'=>__('Jelszó'))) ?>
                </div>
            </div>

            <div class="input-group m-b-20">
                <div class="fg-line">
                    <?= $this->Form->input('mobile', ['type' => 'checkbox', 'label' => 'Mobil verzió' , 'checked' => ($this->request->is('mobile')?'checked':false)]) ?>
                </div>
            </div>
            
            <div class="clearfix"></div>
            <?= $this->Form->button('<i class="md md-arrow-forward"></i>',array('class'=>'btn btn-login btn-danger btn-float')); ?>
           <!-- <a href="" class="btn btn-login btn-danger btn-float"><i class="md md-arrow-forward"></i></a>-->

            <?= $this->Form->end() ?>
        </div>
        
